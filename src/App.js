import { useState } from "react"
import Landing from "./components/Landing"
import Authentication from "./components/Authentication"
import {BrowserRouter as Router , Routes , Route } from "react-router"
import Company from "./components/Company"
import { AuthProvider } from "./components/AuthContext"
import {AnimatePresence} from "motion/react"

export default function App() {
  const [openOverlay , setOpenOverlay] = useState("false")
  const handleAuth = () =>{
    setOpenOverlay((prev) => !prev); 
  }


  return (
    
    <div className="text-3xl font-bold  h-100">
      
      <AuthProvider>
      <AnimatePresence mode="wait">
      <Router>
        <Routes>
          <Route path="/" element={<Landing />}/>
          <Route path="/companyname" element ={<Company/>}/>
       </Routes>
      </Router>
      </AnimatePresence>
      </AuthProvider>
    </div>
    
  )
}
