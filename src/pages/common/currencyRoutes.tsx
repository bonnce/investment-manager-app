import { IDBPDatabase } from "idb"
import { getAll, NAMECOLLCURRENCY } from "misc"
import { iCurrency, iCurrencyDB } from "misc/types"
import {Currency} from "pages"
import { useEffect, useState } from "react"
import { Route } from "react-router-dom"

const CurrencyRoutes = (db:IDBPDatabase<iCurrencyDB>|null)=>{
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

    return data && data?.map((i)=><Route path={`/${i.shortName}`} key={`/${i.shortName}-${i.id}`} element={<Currency id={i.id} key={`/${i.shortName}-${i.id}`} title={i.name}/>} />)
}

export default CurrencyRoutes