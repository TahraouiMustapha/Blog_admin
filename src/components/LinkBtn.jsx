import { Link } from "react-router";


const LinkBtn = ({ to, children }) => {
    return (
        <Link to={to} className='linkBtn'>{children}</Link>
    )
}

export default LinkBtn;