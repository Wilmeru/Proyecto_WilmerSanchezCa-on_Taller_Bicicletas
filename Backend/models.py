from pydantic import BaseModel, Field, BeforeValidator, ConfigDict
from typing import Optional, Annotated

PyObjectId = Annotated[str, BeforeValidator(lambda v: str(v) if v is not None else v)]

class Mantenimientos(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    nombre_cliente: Optional[str] = None
    bicicleta_marca: str
    servicio_realizado: str
    costo: str
    entregado: Optional[bool] = False

    model_config = ConfigDict(
        from_attributes=True,
        populate_by_name=True,
    )


class MantenimientoCreate(BaseModel):
    nombre_cliente: str
    bicicleta_marca: str
    servicio_realizado: str
    costo: str
    entregado: bool = False

    
class UpdateMantenimientos(BaseModel):
    nombre_cliente: Optional[str] = None
    bicicleta_marca: Optional[str] = None
    servicio_realizado: Optional[str] = None
    costo: Optional[str] = None
    entregado: Optional[bool] = False 

    model_config = ConfigDict(
    from_attributes=True,
    populate_by_name=True,
    )




