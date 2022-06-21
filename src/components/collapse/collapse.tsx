import { ThemedIcon2x2 } from "components"
import React, { Children, useContext, useState } from "react"
import right from 'assets/images/right.svg'
import down from 'assets/images/down.svg'
import { Theme } from "misc"

const Collapse = ({title, children} : {title:string, children:React.ReactNode})=>{
    const GAP = 1.5
    const PADDING = 1
    const FONTSIZE = 2.75
    const [open, setOpen] = useState(false)
    const childrenLength = Children.toArray(children).length
    const {theme} = useContext(Theme)
    const handleClick = ()=>{
        setOpen(o => !o)
    }
    return <div className="container column gap-sm align-start collapse">
        <div className="container gap-sm">
            <h2 className="collapse-title" onClick={handleClick}>{title}</h2>
            <ThemedIcon2x2 icon={open ? down : right} alt={open ? 'down' : 'right'} handleClick={handleClick} />
        </div>
        <div className={`container column align-start gap-sm content-collapsed ${open ? 'collapsed-open' : 'collapsed-close'}`}
        style={{backgroundColor:theme.thirty, boxShadow: `inset 0 4px 4px 0 ${theme.shadow}`,
        maxHeight: open ? `${childrenLength*FONTSIZE + (childrenLength-1)*GAP + PADDING}em` : "0"}}>
            {children}
        </div>
    </div>
}

export default Collapse