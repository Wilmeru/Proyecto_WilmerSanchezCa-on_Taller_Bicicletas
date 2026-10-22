from motor.motor_asyncio import AsyncIOMotorClient
from models import Mantenimientos, UpdateMantenimientos
from bson import ObjectId

cliente = AsyncIOMotorClient("mongodb://localhost")
database = cliente.mantenimientosdatabase
coleccion = database.mantenimientos

async def get_one_maintenance_id(id):
    maintenance = await coleccion.find_one({"_id" :ObjectId(id)})
    if maintenance:
        maintenance["_id"] = str(maintenance["_id"])
    return maintenance

async def create_mantenimiento(mantenimiento):
    new_maintenance = await coleccion.insert_one(mantenimiento)
    created_maintenance = await coleccion.find_one({"_id":new_maintenance.inserted_id})
    if created_maintenance:
        created_maintenance["_id"] = str(created_maintenance["_id"])
    
    return created_maintenance 

async def get_todos_mantenimientos():
    mantenimientos = []
    cursor = coleccion.find({})
    async for document in cursor:
        document["_id"] = str(document["_id"])
        mantenimientos.append(Mantenimientos(**document))
    return mantenimientos

async def update(id:str, data:UpdateMantenimientos):
    mantenimientos = data.model_dump(by_alias=True, exclude_none=True)
    mantenimientos.pop("_id", None)
    await coleccion.update_one({"_id": ObjectId(id)}, {"$set": mantenimientos})
    document = await coleccion.find_one({"_id": ObjectId(id)})
    if document:
        document["_id"] = str(document["_id"])
    return document



async def delete_mantenimiento(id:str):
    await coleccion.delete_one({"_id": ObjectId(id)})
    return True

async def get_mantenimiento_por_cliente(nombre_cliente: str, exclude_id: str = None):
    query = {"nombre_cliente": nombre_cliente}
    if exclude_id:
        query["_id"] = {"$ne": ObjectId(exclude_id)}
    mantenimiento = await coleccion.find_one(query)
    return mantenimiento