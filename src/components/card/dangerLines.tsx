import { Theme } from "misc"
import { useContext } from "react"

const DangerLines = ()=>{
    const {theme} = useContext(Theme)
    return <div className="danger-lines" style={{borderLeft:`.75em dashed ${theme.ten}`,borderRight:`.75em dashed ${theme.ten}`,
                boxShadow:`0 0 5vw 1vw ${theme.ten}95`}}/>
}

export default DangerLines