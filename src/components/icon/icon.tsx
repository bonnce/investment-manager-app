import React from "react"

const Icon = ({icon,alt,className,style,onClick}:
    {icon:string,alt:string,style?:React.CSSProperties,onClick?:VoidFunction,className?:string})=>
    <div className={className} onClick={onClick}>
        <img src={icon} alt={alt} style={style} className='icon' />
    </div>


export default Icon