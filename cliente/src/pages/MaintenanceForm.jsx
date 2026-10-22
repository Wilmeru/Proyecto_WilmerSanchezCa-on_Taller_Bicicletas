import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchMaintenance, createMantenimiento, updateMantenimiento, deleteMantenimiento } from "../api/mantenimientos";

function MaintenanceForm() {
  const [nombre_cliente, setNombre] = useState("");
  const [bicicleta_marca, setMarca] = useState("");
  const [servicio_realizado, setServicio] = useState("");
  const [costo, setCosto] = useState("");
  const params = useParams()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
    if (!params.id){
      const res = await createMantenimiento({nombre_cliente, bicicleta_marca, servicio_realizado, costo})
    console.log(res);
  }else {
    const res = await updateMantenimiento(params.id, {nombre_cliente, bicicleta_marca, servicio_realizado, costo})
    console.log(res);
      alert("El mantenimiento se actualizó correctamente.");
    }
  navigate("/");
} catch (error) {
    if (error.response?.data?.detail === "Ya existe un mantenimiento para este cliente") {
      alert("Ya existe un mantenimiento con ese nombre.");
    } else {
      console.error(error);
    }
}
    e.target.reset();
  };

  useEffect(()=>{
    if (params.id){
      fetchMaintenance(params.id)
      .then((res) => {
        setNombre(res.data.nombre_cliente)
        setMarca(res.data.bicicleta_marca)
        setServicio(res.data.servicio_realizado)
        setCosto(res.data.costo)
      })
      .catch((err) => console.log(err))
    }
  }, [])

  return (
    <div className="flex items-center justify-center h-[calc(100vh-10rem)]">
      <div>
      <form className="bg-zinc-950 p-10" onSubmit={handleSubmit}>
        <h1 className="text-3x1 font-bold my-4">
          {
            params.id ? "Actualizar Mantenimiento" : "Crear Mantenimiento"
          }
          </h1>

        <input
          type="text"
          placeholder="Nombre Usuario"
          className="block py-2 px-3 mb-4 w-full text-black"
          onChange={(e) => setNombre(e.target.value)}
          value={nombre_cliente}
          autoFocus
        />

        
        <input
          type="text"
          placeholder="Marca Bicicleta"
          className="block py-2 px-3 mb-4 w-full text-black"
          onChange={(e) => setMarca(e.target.value)}
          value={bicicleta_marca}
        />

        
        <input
          type="text"
          placeholder="Servicio Realizado"
          className="block py-2 px-3 mb-4 w-full text-black"
          onChange={(e) => setServicio(e.target.value)}
          value={servicio_realizado}
        />

        
        <input
          type="text"
          placeholder="Costo"
          className="block py-2 px-3 mb-4 w-full text-black"
          onChange={(e) => setCosto(e.target.value)}
          value={costo}
        />

        <button className="bg-white hover:bg-slate-800 hover:text-white text-slate-800 py-2 px-4 rounded">
          {params.id ? "Actualizar Mantenimiento" : "Crear Mantenimiento"}
        </button>
      </form>
      {
        params.id && (

          <button className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-6 rounded mt-5"
          onClick={async () => {
            try{
              const res = await deleteMantenimiento(params.id)
              console.log(res)
              alert("El mantenimiento se eliminó correctamente.");
              navigate("/")
            }catch (error){
              console.log(error)
            }
          }}>
            Borrar
          </button>
        )
      }
      </div>
    </div>
  );
}
export default MaintenanceForm;