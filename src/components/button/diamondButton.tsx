import { Theme } from "misc"
import { useContext } from "react"

const DiamondButton = ({icon}:{icon:string}) =>{
    const {theme} = useContext(Theme)
    return <button className="container diamond-button" style={{backgroundColor:theme.ten,color:theme.text,
        boxShadow: `0 4px 4px 0 ${theme.shadow}`}}>
        <img src={icon} alt={icon} className='icon' style={{filter:`invert(${theme.invert})`}} />
    </button>
}

export default DiamondButton