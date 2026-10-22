import { BrowserRouter, Routes, Route} from "react-router-dom"
import Homepage from "./pages/Homepage"
import MaintenanceForm from "./pages/maintenanceForm"
import Navbar from "./components/Navbar"  


function App(){
  return(
    <BrowserRouter>
    <div className="container mx-auto px-10">
      <Navbar/>
      <Routes>

        <Route path="/" element={<Homepage/>}/>
        <Route path="/mantenimientos/new" element={<MaintenanceForm />} />
        <Route path="/mantenimientos/:id" element={<MaintenanceForm />} />

      </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App