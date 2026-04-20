import { useEffect } from "react";

const Popup = ({ message, setPopupOpen }) => {

    useEffect(() => {
        setTimeout(() => {
            setPopupOpen(false)
        }, 4000)
    }, [])

    return (
        <div className="bg-gray-50 h-24 w-64 shadow-xl rounded-md border border-primary flex flex-col items-center justify-center gap-3 absolute top-0 right-0 z-50 lg:mr-16">
            <div>
                <p>{message}</p>
            </div>
            <button
                onClick={() => setPopupOpen(false)}
                className="bg-primary text-white p-2 rounded-sm hover:bg-darkerPrimary transition duration-300 ease cursor-pointer">
                Ok
            </button>
        </div>
    )
}

export default Popup; 
