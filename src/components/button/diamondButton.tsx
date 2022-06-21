import { Theme } from "misc"
import { ButtonHTMLAttributes, DetailedHTMLProps, useContext, useRef } from "react"

const DiamondButton = (props:DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>,HTMLButtonElement>) =>{
    const {children,
        style,
        className,
        ...restProps} = props
    const {theme} = useContext(Theme)

    const newClassName = `container diamond-button ${className || ''}`
    const newStyles = {...style, backgroundColor:theme.ten,color:theme.text,boxShadow: `0 4px 4px 0 ${theme.shadow}`}

    const buttonRef = useRef<HTMLButtonElement>(null);
    const mouseDown = ()=>{
        if(buttonRef.current) {
            buttonRef.current.style.backgroundColor=theme.sixty
            buttonRef.current.style.boxShadow=`0 0px 0px 0 ${theme.shadow},inset 4px 4px 4px 0 ${theme.shadow}`
        }
    }
    const mouseUp = ()=>{
        if(buttonRef.current){
            buttonRef.current.style.backgroundColor=theme.ten
            buttonRef.current.style.boxShadow= `4px 4px 4px 0 ${theme.shadow},inset 0 0px 0px 0 ${theme.shadow}`
        }
    }

    return <button ref={buttonRef} onMouseDown={mouseDown} onMouseUp={mouseUp} onMouseLeave={mouseUp} onTouchStart={mouseDown}
    onTouchEnd={mouseUp} className={newClassName} {...restProps} style={newStyles}>
        {children}
    </button>
}

export default DiamondButton