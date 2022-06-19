import { Theme } from "misc"
import { useContext } from "react"
import { Link } from "react-router-dom"

const Navigation = ()=>{
    const theme = useContext(Theme)
    return <div className='container column align-start nav'>
        <Link to='/' className="nav-link" style={{color:theme.text}}>Agregar Moneda</Link>
    </div>
}

export default Navigation