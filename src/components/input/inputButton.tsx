import { Theme } from "misc"
import { useContext, useRef } from "react"

const InputButton = ({name} : {name:string}) => {
    const {theme} = useContext(Theme)
    const buttonRef = useRef<HTMLInputElement>(null);
    const mouseDown = ()=>{
        if(buttonRef.current) {
            buttonRef.current.style.backgroundColor=theme.sixty
            buttonRef.current.style.boxShadow=`inset 0px 4px 4px 0 ${theme.ten}b0`
        }
    }
    const mouseUp = ()=>{
        if(buttonRef.current){
            buttonRef.current.style.backgroundColor=theme.ten
            buttonRef.current.style.boxShadow= `0px 4px 4px 0 ${theme.sixty}65,0px 4px 4px 0 ${theme.ten}`
        }
    }

    return <input ref={buttonRef} type="submit" className="input-button" value={name} 
    onMouseDown={mouseDown} onMouseUp={mouseUp} onMouseLeave={mouseUp} onTouchStart={mouseDown} onTouchEnd={mouseUp}
    style={{backgroundColor:theme.ten,color:theme.text, boxShadow: `0px 4px 4px 0 ${theme.sixty}65, 0px 4px 4px 0 ${theme.ten}`}} />
}


export default InputButton