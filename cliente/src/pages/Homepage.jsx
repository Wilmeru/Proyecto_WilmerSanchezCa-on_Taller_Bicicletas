import { useEffect, useState } from "react";
import { fetchMaintenances } from "../api/mantenimientos";
import MaintenanceList from "../components/MaintenanceList";

function Homepage() {
  const [mantenimientos, setMantenimientos] = useState([]);

  useEffect(() => {
    fetchMaintenances()
    .then(res => {
      setMantenimientos(res.data)
    })
    .catch((err) => console.error(err))
  }, []);
  return (
      <MaintenanceList mantenimientos={mantenimientos} />
  );
}

export default Homepage;