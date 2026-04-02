// components
import { Logo } from "./Logo"
import DropDownMenu from "./DropDownMenu"

// icons 
import { Menu } from "lucide-react"

// hooks
import { useMediaQuery } from 'react-responsive'
import { useState, useRef } from "react"
import { useLocation } from "react-router"

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
                    : <h2>yes is big</h2>
            }
            {/* {
                isMobile
                    ? <HamburgerMenu handleLogout={handleLogout} isOpen={isOpen} setIsOpen={setIsOpen} />
                    : <Btns handleLogout={handleLogout} />
            } */}
        </div>
    )
}

export default Header;