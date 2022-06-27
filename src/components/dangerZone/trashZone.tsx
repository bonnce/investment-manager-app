import { Icon } from "components/icon"
import { Theme } from "misc"
import { useContext } from "react"
import trashOpenLight from 'assets/images/trashOpenLight.svg'
import trashOpenDark from 'assets/images/trashOpenDark.svg'
import trashCloseDark from 'assets/images/trashCloseDark.svg'
import trashCloseLight from 'assets/images/trashCloseLight.svg'

const TrashZone = ({left, close, className} : {left?:boolean, close:boolean, className?:string})=>{
    const {theme} = useContext(Theme)
    const border = `border${left?'Right':'Left'}`
    const position = left? 'left' : 'right'
    const flip = !left ? '' : 'scale(-1,1)'
    const newClass = `trash-zone container ${className || ''}`

    return <div className={newClass} style={{[border]:`.75em dashed ${theme.ten}`, [position]:'0' }}>
            <div data-trash='close' style={{opacity:close?'1':'0'}} className="trash-icon">

            <Icon icon={theme.invert === '0'? trashCloseLight : trashCloseDark} alt='trash'  style={{transform:flip}} />
            </div>
            <div data-trash='open' className="trash-icon" style={{opacity:close?'0':'1'}}>

            <Icon icon={theme.invert === '0'? trashOpenLight : trashOpenDark} alt='trash'  style={{transform:flip}} />
            </div>
        </div>
}

export default TrashZone