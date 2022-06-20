import { Collapse } from "components"
import BaseLink from "./baseLink"

const ARRAY = ['ETH','ADA', 'BTC']

const Navigation = ({handleLinkClick} : {handleLinkClick:VoidFunction}) => 
    <div className='container column align-start gap-md nav'>
        <BaseLink to='/' onClick={handleLinkClick} >Agregar Moneda</BaseLink>
        <BaseLink to='/summary' onClick={handleLinkClick} >Resumen</BaseLink>
        <Collapse title="Monedas">
            {ARRAY.map((i) => <BaseLink to={`/${i}`} key={i} onClick={handleLinkClick} >{i}</BaseLink>)}
        </Collapse>
    </div>

export default Navigation