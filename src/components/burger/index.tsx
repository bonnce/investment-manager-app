import { Theme } from 'misc'
import { useContext } from 'react'
const Burger = ({icon, handleClick}:{icon:string, handleClick:VoidFunction})=>{
const theme = useContext(Theme)
return <div className="burger" onClick={handleClick}>
    <img src={icon} alt="burger" className='icon-burger' style={{filter:`invert(${theme.invert})`}} />
</div>}

export default Burger