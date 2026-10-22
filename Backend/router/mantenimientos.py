from fastapi import APIRouter, HTTPException
from database import (get_todos_mantenimientos,create_mantenimiento,get_mantenimiento_por_cliente, get_one_maintenance_id, delete_mantenimiento, update)
from models import MantenimientoCreate, Mantenimientos, UpdateMantenimientos
from bson import ObjectId

mantenimiento = APIRouter()

@mantenimiento.get("/api/mantenimientos")
async def get_mantenimientos():
    mantenimientos = await get_todos_mantenimientos()
    return mantenimientos

@mantenimiento.post("/api/mantenimientos")
async def save_mantenimientos(mantenimientos: UpdateMantenimientos):
    mantenimiento_existente = await get_mantenimiento_por_cliente(mantenimientos.nombre_cliente)

    if mantenimiento_existente:
        raise HTTPException(status_code=400, detail="Ya existe un mantenimiento para este cliente",)

    responsive = await create_mantenimiento(mantenimientos.model_dump())
    return responsive




@mantenimiento.get("/api/mantenimientos/{id}", response_model=Mantenimientos)
async def get_mantenimientos(id:str):
    if not ObjectId.is_valid(id):
        raise HTTPException(400, "El formato del ID es invalido")

    mantenimientos = await get_one_maintenance_id(id)
    if mantenimientos:
        return mantenimientos
    raise HTTPException(404, f"Mantenimiento {id} no encontrado con ID")


@mantenimiento.put("/api/mantenimientos/{id}", response_model=Mantenimientos)
async def put_mantenimientos(id: str, mantenimientos: UpdateMantenimientos):
    if not ObjectId.is_valid(id):
        raise HTTPException(400, "El formato del ID es invalido")

    if mantenimientos.nombre_cliente is not None:
        mantenimiento_existente = await get_mantenimiento_por_cliente(
            mantenimientos.nombre_cliente,
            exclude_id=id,
        )
        if mantenimiento_existente:
            raise HTTPException(
                status_code=400,
                detail="Ya existe un mantenimiento para este cliente",
            )

    response = await update(id, mantenimientos)
    if response:
        return response

    raise HTTPException(404, f"Mantenimiento {id} no encontrado")


@mantenimiento.delete("/api/mantenimientos/{id}")
async def remove_mantenimiento(id:str):
    response = await delete_mantenimiento(id)
    if response:
        return "Mantenimiento borrado correctamente"
    raise HTTPException(404, f"Mantenimiento {id} no encontrado")