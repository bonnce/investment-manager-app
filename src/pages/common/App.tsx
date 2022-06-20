import { themes, Theme } from "misc"
import { CurrencyManager, Currency, Summary } from "pages"
import { useState } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

const ARRAY = ['ETH','ADA', 'BTC']

const App = ()=>{
    const [theme,setTheme] = useState(themes.light)
    const handleTheme = ()=>{
        setTheme(t => t===themes.dark ? themes.light : themes.dark)
    }
    return <Theme.Provider value={{theme,setTheme:handleTheme}}>
        <Router>
            <Routes>
                <Route index element={<CurrencyManager/>} />                
                <Route path='/summary' element={<Summary/>} />
                {ARRAY.map((i) => <Route path={`/${i}`} key={i} element={<Currency title={i} />} />)}
            </Routes>
        </Router>
    </Theme.Provider>
}

export default App