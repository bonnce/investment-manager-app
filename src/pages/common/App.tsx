import { themes, Theme } from "misc"
import CurrencyManager from "pages/CurrencyManager"
import { useState } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"


const App = ()=>{
    const [theme,setTheme] = useState(themes.dark)
    return <Theme.Provider value={theme}>
        <Router>
            <Routes>
                <Route index element={<CurrencyManager/>} />
            </Routes>
        </Router>
    </Theme.Provider>
}

export default App