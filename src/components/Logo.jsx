import { Newspaper } from "lucide-react"

const LogoName = () => {
    return (
        <>
            Blog<span className="text-primary">TOP</span>
        </>
    )
}

const Logo = () => {
    return (
        <div className="flex items-center gap-2">
            <Newspaper size={40} />
            <h2 className="text-2xl font-bold tracking-wide">
                <LogoName />
            </h2>
        </div>
    )
}


export { Logo, LogoName };