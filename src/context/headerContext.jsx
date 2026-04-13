import { createContext } from "react"


export const HeaderContext = createContext({
    admin: null,
    logout: () => { }
})
