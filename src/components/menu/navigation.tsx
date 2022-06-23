import { Collapse } from "components"
import { Database, getAll, iCurrency, NAMECOLLCURRENCY } from "misc"
import { useContext, useEffect, useState } from "react"
import BaseLink from "./baseLink"

const Navigation = ({handleLinkClick} : {handleLinkClick:VoidFunction}) => {
    const db = useContext(Database)
    const [data,setData] = useState<iCurrency[] | null>(null)
    
    useEffect(()=>{
        const getAllData = async ()=>{
            if(db){
                const rawData = await getAll(db,NAMECOLLCURRENCY) as iCurrency[]
                setData(rawData)
            }
        }
        getAllData()
    },[db])
    return <div className='container column align-start gap-md nav'>
        <BaseLink to='/' onClick={handleLinkClick} >Agregar Moneda</BaseLink>
        <BaseLink to='/summary' onClick={handleLinkClick} >Resumen</BaseLink>
        <Collapse title="Monedas">
            {data && data.map((i) => 
            <BaseLink to={`/${i.shortName}`} className='uppercase' key={i.shortName} onClick={handleLinkClick} >{i.shortName}</BaseLink>)}
        </Collapse>
    </div>
}

export default Navigation