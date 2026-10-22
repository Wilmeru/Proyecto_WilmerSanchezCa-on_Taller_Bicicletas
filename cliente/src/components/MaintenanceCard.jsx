import { useNavigate } from "react-router-dom";
import { updateMantenimiento } from "../api/mantenimientos";

function MaintenanceCard({ mantenimiento}) {
    const navigate = useNavigate()
    return (
        <div className="bg-zinc-950 p-4 hover:cursor-pointer hover:bg-gray-950" onClick={() => {
            navigate(`/mantenimientos/${mantenimiento._id}`)
        }}>
            <div className="flex justify-between">
                <h2 className="font-bold text-2x1">{mantenimiento.nombre_cliente}</h2>
                    <button
                    onClick={async (e) => {
                        e.stopPropagation()
                        const res = await updateMantenimiento(mantenimiento._id, {entregado: !mantenimiento.entregado})
                        if (res.status == 200){
                            window.location.reload()
                        }
                    }}>
                        
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className={`w-6 h-6 ${mantenimiento.entregado ? `text-green-500` : ` `}`}
                            >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m4.5 12.75 6 6 9-13.5"
                            />
                        </svg>
                    </button>
            </div>
            <p className="text-slate-300">Marca: {mantenimiento.bicicleta_marca}</p>
            <p className="text-slate-300"> Servicio: {mantenimiento.servicio_realizado}</p>
            <p className="text-slate-300"> Costo: ${mantenimiento.costo}</p>

        </div>
    )
}

export default MaintenanceCard