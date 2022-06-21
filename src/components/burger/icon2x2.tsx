import Icon from './icon'

const Icon2x2 = ({icon,alt, handleClick}:{icon:string, alt:string, handleClick:VoidFunction})=>
    <Icon className='icon-2x2' onClick={handleClick} icon={icon} alt={alt} />

export default Icon2x2