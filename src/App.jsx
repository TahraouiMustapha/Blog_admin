import Header from "./components/header"
import Footer from "./components/footer"
import { Outlet } from "react-router"

function App() {
  return (
    <div className="font-rob min-h-screen w-full flex flex-col bg-white">
      <Header></Header>
      <Outlet />
      <Footer></Footer>
    </div>
  )
}

export default App
