// components
import { Logo } from "./Logo"
import DropDownMenu from "./DropDownMenu"
import LinkBtn from "./LinkBtn"

// icons 
import { Menu } from "lucide-react"

// hooks
import { useMediaQuery } from 'react-responsive'
import { useState, useRef } from "react"
import { useLocation, useNavigate } from "react-router"
import { useContext } from "react"

//context
import { HeaderContext } from "../context/headerContext"

const HamburgerMenu = () => {
    const [isOpen, setIsOpen] = useState(false)
    const location = useLocation()
    const path = useRef(location.pathname)

    const handleClick = () => {
        setIsOpen((prev) => !prev)
    }

    if (path.current !== location.pathname) {
        path.current = location.pathname
        setIsOpen(false)
    }

    return (
        <div>
            <Menu
                className="stroke-3"
                onClick={handleClick}
            />
            {isOpen && <DropDownMenu handleClick={handleClick} />}
        </div>
    )
}

const Btns = () => {
    const context = useContext(HeaderContext)
    const [loading, setLoading] = useState(false)


    return (
        <div className="flex items-center gap-8 text-lg">
            <LinkBtn to={'/'}>Home</LinkBtn>
            <LinkBtn to={'/newpost'}>New Post</LinkBtn>

            <button
                disabled={loading}
                onClick={async () => {
                    setLoading(true)
                    await context.logout()
                    setLoading(false)
                }}
                className="bg-primary text-white p-2 rounded-sm hover:bg-darkerPrimary transition duration-300 ease cursor-pointer"
            >
                {loading ? 'Logging out ..' : 'Logout'}
            </button>

        </div>
    )
}

const Header = () => {
    const isMobile = useMediaQuery({
        query: '(max-width: 768px)'
    })


    return (
        <div className="bg-white h-18 flex justify-around items-center border-b border-brdClr sticky top-0 z-10">
            <Logo />
            {
                isMobile
                    ? <HamburgerMenu />
                    : <Btns />
            }

        </div>
    )
}

export default Header;