import { IDBPDatabase } from "idb"
import { themes, Theme, createDB, Database, NAMEDB} from "misc"
import { iCurrencyDB } from "misc/types"
import { CurrencyManager, Summary } from "pages"
import { useEffect, useState } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import CurrencyRoutes from "./currencyRoutes"

const App = ()=>{
    const [theme,setTheme] = useState(themes.light)
    const [db,setDB] = useState<IDBPDatabase<iCurrencyDB>|null>(null)
    
    const handleDB = async ()=>{
        const db = await createDB(NAMEDB)
        setDB(db)
    }

    const handleTheme = ()=>{
        setTheme(t => t===themes.dark ? themes.light : themes.dark)
    }

    useEffect(()=>{
        handleDB()
    },[])

    return <Theme.Provider value={{theme,setTheme:handleTheme}}>
        <Database.Provider value={db}>
            <Router basename="/investment-manager-app">
                <Routes>
                    <>
                    <Route index element={<CurrencyManager/>} />                
                    <Route path='/summary' element={<Summary/>} />
                    {CurrencyRoutes(db)}
                    </>
                </Routes>
            </Router>
        </Database.Provider>
    </Theme.Provider>
}

export default App