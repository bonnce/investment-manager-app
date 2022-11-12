import { IDBPDatabase } from "idb"
import { themes, Theme, createDB, Database, NAMEDB, useDeferredPrompt, DeferredPrompt, getAll, save, remove, NAMECOLLCURRENCY, NAMECOLLSHOPPING} from "misc"
import { getAllCurrencies, getAllShoppings, saveCurrency, saveShopping } from "misc/apiServices"
import { CurrencyReal, iCurrencyDB, ShoppingReal } from "misc/types"
import { compareListsObjById } from "misc/utils"
import { CurrencyManager, Summary, InstallAppPage } from "pages"
import { useEffect, useState } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import CurrencyRoutes from "./currencyRoutes"

const App = ()=>{
    const [theme,setTheme] = useState(themes.light)
    const [db,setDB] = useState<IDBPDatabase<iCurrencyDB>|null>(null)
    
    const main = async ()=>{
        const db = await createDB(NAMEDB)
        setDB(db)
        syncApi(db)
    }

    const syncApi = async (db:IDBPDatabase<iCurrencyDB>| null)=>{
        if(db){
            const currenciesAPI = await getAllCurrencies()
            const shoppingsAPI = await getAllShoppings()
            const currenciesDB = await getAll(db, NAMECOLLCURRENCY) as CurrencyReal[]
            const shoppingsDB = await getAll(db, NAMECOLLSHOPPING) as ShoppingReal[]
            if(currenciesDB && shoppingsDB){
                const [remainedCurrencies,currOffline] = compareListsObjById<CurrencyReal>(currenciesAPI,currenciesDB)
                const [remainedShoppings,invOffline] = compareListsObjById<ShoppingReal>(shoppingsAPI,shoppingsDB)
                if(currOffline)
                    remainedCurrencies.forEach(async rc => {
                    await saveCurrency(rc)
                    }) 
                else {
                    currenciesDB.forEach(curr => remove(db,NAMECOLLCURRENCY,curr.id))
                    currenciesAPI.forEach(async rc => {
                        await save(db,NAMECOLLCURRENCY,rc)
                    }) 
                }

                if(invOffline)
                remainedShoppings.forEach(async rs => {
                   await saveShopping(rs)
                })
                else{
                    shoppingsDB.forEach(shop => remove(db,NAMECOLLSHOPPING,shop.id))
                    shoppingsAPI.forEach(async rs => {
                        await save(db,NAMECOLLSHOPPING,rs)
                    })
                }
            }
            
        }
    }

    const handleTheme = ()=>{
        setTheme(t => t===themes.dark ? themes.light : themes.dark)
    }
    const [deferredPrompt,setDeferredPrompt] = useDeferredPrompt()

    useEffect(()=>{
        main()
    }, [])

    return <Theme.Provider value={{theme,setTheme:handleTheme}}>
        <Database.Provider value={db}>
        <DeferredPrompt.Provider value={{deferredPrompt,setDeferredPrompt}}>

            <Router basename="/investment-manager-app">
                <Routes>
                    <>
                    <Route index element={<CurrencyManager/>} />                
                    <Route path='/summary' element={<Summary/>} />
                    {CurrencyRoutes(db)}
                        <Route path='/install' element={<InstallAppPage/>} />
                    </>
                </Routes>
            </Router>
            </DeferredPrompt.Provider>
        </Database.Provider>
    </Theme.Provider>
}

export default App