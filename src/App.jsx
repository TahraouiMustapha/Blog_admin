// components
import Header from "./components/header"
import Footer from "./components/footer"
import Login from "./pages/Login"
import { Outlet } from "react-router"

// hooks
import useGetAdmin from "./hooks/useGetAdmin"

// context
import { HeaderContext } from "./context/headerContext"

function App() {
  const { admin, setAdmin } = useGetAdmin()

  const handleLogout = async () => {
    const accessToken = sessionStorage.getItem('accessToken')
    if (!accessToken) return;

    try {
      const response = await fetch('/api/auth/logout', {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${accessToken}`
        }
      })

      if (!response.ok) {
        throw new Error("Failed to log out!")
      }

      sessionStorage.removeItem('accessToken')
      setAdmin(null)

    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="font-rob min-h-screen w-full flex flex-col bg-white">
      {/* make a context with just setAdmin  , rewrite hnaldeLogout func in App comp and pass it to context  */}
      <HeaderContext value={{ logout: handleLogout }}>
        <Header setAdmin={setAdmin}></Header>
      </HeaderContext>

      {admin ? <Outlet /> : <Login setAdmin={setAdmin} />}
      <Footer></Footer>
    </div>
  )
}

export default App
