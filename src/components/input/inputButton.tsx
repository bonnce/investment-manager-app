import { Theme } from "misc"
import { useContext } from "react"

const InputButton = ({name} : {name:string}) => {
    const {theme} = useContext(Theme)
    return <input type="submit" className="input-button" value={name} 
    style={{backgroundColor:theme.ten,color:theme.text, boxShadow: `0 4px 4px 0 ${theme.shadow}`}} />
}


export default InputButton