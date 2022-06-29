import { Theme } from 'misc'
import { useContext } from 'react'
import Icon from './icon'

const ThemedIcon = ({icon,alt,className, handleClick}:{icon:string, alt:string,className?:string, handleClick?:VoidFunction})=>{
const {theme} = useContext(Theme)
    return <Icon className={className} onClick={handleClick} icon={icon} alt={alt} style={{filter:`invert(${theme.invert})`}} />
}

export default ThemedIcon