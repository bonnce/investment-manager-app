import { Theme } from 'misc'
import { useContext } from 'react'
import Icon from './icon'

const ThemedIcon2x2 = ({icon,alt, handleClick}:{icon:string, alt:string, handleClick?:VoidFunction})=>{
const {theme} = useContext(Theme)
    return <Icon className='icon-2x2' onClick={handleClick} icon={icon} alt={alt} style={{filter:`invert(${theme.invert})`}} />   
}

export default ThemedIcon2x2