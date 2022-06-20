import { Theme } from "misc"
import React, { useContext } from "react"

const Card = ({children} : {children:React.ReactNode})=>{
    const {theme} = useContext(Theme)
    return <div className="container card" style={{backgroundColor: theme.thirty, boxShadow: `0 4px 4px 0 ${theme.shadow}`}}>
        {children}
    </div>
}

export default Card