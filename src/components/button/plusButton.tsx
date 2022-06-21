import cross from 'assets/images/cross.svg'
import { DiamondButton, Icon } from "components";
import { useContext } from "react";
import { Theme } from "misc";

const PlusButton = ()=>{
    const {theme} = useContext(Theme)
    return <DiamondButton>
        <Icon icon={cross} alt='cross' style={{filter:`invert(${theme.invert})`}} />
    </DiamondButton>
}

export default PlusButton