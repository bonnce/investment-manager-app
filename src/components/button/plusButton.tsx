import cross from 'assets/images/cross.svg'
import { BasicButton, Icon } from "components";
import { useContext } from "react";
import { Theme } from "misc";

const PlusButton = ({onClick, className}:{onClick?:React.MouseEventHandler<HTMLButtonElement>,className?:string})=>{
    const {theme} = useContext(Theme)
    const newClass = `diamond-button ${className || ''}`
    return <BasicButton className={newClass} onClick={onClick}>
        <Icon icon={cross} alt='cross' style={{filter:`invert(${theme.invert})`}} />
    </BasicButton>
}

export default PlusButton