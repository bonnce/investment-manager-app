import { Database, getAll } from "misc"
import { iCurrency } from "misc/types"
import {Currency} from "pages"
import { useContext, useEffect, useState } from "react"
import { Route } from "react-router-dom"

const CurrencyRoutes = ()=>{
    const db = useContext(Database)
    const [data,setData] = useState<iCurrency[] | null>(null)
    
    useEffect(()=>{
        const getDB = async ()=>{
            if(db){
                const all = await getAll(db)
                setData(all)
            }
        }
        getDB()
    },[db])

    return data && data?.map((i)=><Route element={<Currency title={i.shortName}/>} />)
}

export default CurrencyRoutes