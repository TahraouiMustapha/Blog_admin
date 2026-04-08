// components
import Header from "./components/header"
import Footer from "./components/footer"
import Login from "./pages/Login"
import { Outlet } from "react-router"
import { useState } from "react"

function App() {
  const [admin, setAdmin] = useState(null)


  return (
    <div className="font-rob min-h-screen w-full flex flex-col bg-white">
      <Header></Header>
      {admin ? <Outlet /> : <Login setAdmin={setAdmin} />}
      <Footer></Footer>
    </div>
  )
}

export default App
