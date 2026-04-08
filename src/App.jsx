// components
import Header from "./components/header"
import Footer from "./components/footer"
import Login from "./pages/Login"
import { Outlet } from "react-router"

// hooks
import useGetAdmin from "./hooks/useGetAdmin"

function App() {
  const { admin, setAdmin } = useGetAdmin()


  return (
    <div className="font-rob min-h-screen w-full flex flex-col bg-white">
      <Header></Header>
      {admin ? <Outlet /> : <Login setAdmin={setAdmin} />}
      <Footer></Footer>
    </div>
  )
}

export default App
