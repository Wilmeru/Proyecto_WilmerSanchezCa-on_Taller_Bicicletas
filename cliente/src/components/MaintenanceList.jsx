import MainternanceCard from "../components/MaintenanceCard";

function MainternanceList ({ mantenimientos }){
    return (
        <div className="grid grid-cols-3 gap-4">
            {mantenimientos.map((mantenimiento) => (
                <MainternanceCard mantenimiento={mantenimiento} key={mantenimiento._id}/>
            
            ))}
        </div>
    )
}

export default MainternanceList;