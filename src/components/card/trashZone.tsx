import { Icon } from "components/icon"
import { Theme } from "misc"
import { MouseEventHandler, useContext, useState } from "react"
import trashOpenLight from 'assets/images/trashOpenLight.svg'
import trashOpenDark from 'assets/images/trashOpenDark.svg'
import trashCloseDark from 'assets/images/trashCloseDark.svg'
import trashCloseLight from 'assets/images/trashCloseLight.svg'

const TrashZone = ({left} : {left?:boolean})=>{
    const {theme} = useContext(Theme)
    const border = `border${left?'Right':'Left'}`
    const position = left? 'left' : 'right'
    const flip = !left ? '' : 'scale(-1,1)'
    const [open, setOpen] = useState(true)

    const invert = (i:string, target:HTMLDivElement)=>{
        target.childNodes.forEach((child)=>{
            const c = child as HTMLElement

            if(c.dataset.trash){
        console.log(c.dataset.trash)

                c.style.opacity = '0'
                if(c.dataset.trash === i){
                    c.style.opacity = '1'
                }
            }
        })
    }

    const handleMouseLeave:MouseEventHandler<HTMLDivElement> = (e)=>{
        const target = e.target as HTMLDivElement
        // invert('open',target)
        setOpen(true)
    }

    const handleMouseOver:MouseEventHandler<HTMLDivElement> = (e)=>{
        const target = e.target as HTMLDivElement
        // invert('close',target)
        setOpen(false)
    }
    return <div className="trash-zone container" style={{[border]:`.75em dashed ${theme.ten}`, [position]:'0' }}
        onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave} onMouseOut={handleMouseLeave}>
            <div data-trash='close' style={{opacity:open?'0':'1'}} className="trash-icon">

            <Icon icon={theme.invert === '0'? trashCloseLight : trashCloseDark} alt='trash'  style={{transform:flip}} />
            </div>
            <div data-trash='open' className="trash-icon" style={{opacity:open?'1':'0'}}>

            <Icon icon={theme.invert === '0'? trashOpenLight : trashOpenDark} alt='trash'  style={{transform:flip}} />
            </div>
        </div>
}

export default TrashZone