import cross from 'assets/images/cross.svg'
import { DiamondButton, Icon } from "components";
import { useContext } from "react";
import { Theme } from "misc";

const PlusButton = ({onClick}:{onClick?:React.MouseEventHandler<HTMLButtonElement>})=>{
    const {theme} = useContext(Theme)
    return <DiamondButton onClick={onClick}>
        <Icon icon={cross} alt='cross' style={{filter:`invert(${theme.invert})`}} />
    </DiamondButton>
}

export default PlusButton