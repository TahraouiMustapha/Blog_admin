// components 
import { Logo } from "./Logo"
import LinkBtn from "./LinkBtn";

// icons 
import { X, House, Info, LogOut } from "lucide-react";


// hooks
import { useState, useContext } from "react";
// context 
import { HeaderContext } from "../context/headerContext";

const DropDownMenu = ({ handleClick }) => {
    // for logout func
    const [loading, setLoading] = useState(false)
    const context = useContext(HeaderContext)

    return (
        <div className="bg-gray-500 absolute h-screen w-screen inset-0 flex animate-open-overlay">
            {/* backdrop */}
            <div
                onClick={handleClick}
                className="flex-1 relative" >
                <X className="stroke-white stroke-2 absolute top-1 right-2" />
            </div>
            {/* menu */}
            <div className="bg-white h-full w-[45%] flex flex-col p-4 gap-8 animate-open-menu">
                <div>
                    <Logo />
                </div>

                {context.admin
                    ? <div className="grid h-[33%] auto-rows-fr btnsMenu">
                        <div>
                            <House />
                            <LinkBtn to={'/'}>Home</LinkBtn>
                        </div>
                        <div>
                            <Info />
                            <LinkBtn to={'/newpost'}>New Post</LinkBtn>
                        </div>

                        {/* before auth */}
                        <div className="">
                            <LogOut />
                            <button
                                disabled={loading}
                                onClick={async () => {
                                    setLoading(true)
                                    await context.logout()
                                    setLoading(false)
                                    handleClick()
                                }}
                                className="rounded-sm hover:bg-darkerPrimary transition duration-300 ease cursor-pointer"
                            >
                                {loading ? 'Logging out ..' : 'Logout'}
                            </button>
                        </div>

                    </div>
                    : 'Log in first!'}
            </div>
        </div>
    )
}


export default DropDownMenu;