// components 
import { Logo } from "./Logo"
import LinkBtn from "./LinkBtn";

// icons 
import { X, House, Info, LogOut } from "lucide-react";

const DropDownMenu = ({ handleClick, handleLogout }) => {


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

                <div className="grid h-[33%] auto-rows-fr btnsMenu">
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
                            className="rounded-sm hover:bg-darkerPrimary transition duration-300 ease cursor-pointer"
                        >
                            Log out
                        </button>
                    </div>

                    {/* {
                        authUser
                            ? (
                                <div>
                                    <LogOut />
                                    <button
                                        onClick={handleLogout}
                                        className="p-2 rounded-sm hover:bg-darkerPrimary transition duration-300 ease cursor-pointer"
                                    >
                                        Log out
                                    </button>
                                </div>
                            ) : (<>
                                <div>
                                    <LogIn />
                                    <LinkBtn to={'/signin'}>Login</LinkBtn>
                                </div>
                                <div>
                                    <PrimaryBtn to={'/signup'}>Sign Up</PrimaryBtn>
                                </div>
                            </>)
                    } */}
                </div>
            </div>
        </div>
    )
}


export default DropDownMenu;