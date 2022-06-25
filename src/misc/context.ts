import { IDBPDatabase } from 'idb'
import React from 'react'
import { iCurrencyDB } from './types'

const themes = {
    light:{
        'sixty' : "#fffce6",
        'thirty' : "#ffe4b3",
        'ten' : "#ff8c1a",
        'text' : "#000000",
        'shadow' : "#ff8c1a48",
        'invert' : "0",
    },
    dark:{
        'sixty' : "#110B50",
        'thirty' : "#3C5095",
        'ten' : "#0cb4c0",
        'text' : "#FFFFFF",
        'shadow' : "#0cb4c0B0",
        'invert' : "1",
    }
}


const Theme = React.createContext({theme:themes.light,setTheme:()=>{}})
const Database = React.createContext<IDBPDatabase<iCurrencyDB>|null>(null)

export{
    themes,
    Theme,
    Database
}