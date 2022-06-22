import { IDBPDatabase } from 'idb'
import React from 'react'
import { iCurrencyDB } from './types'

const themes = {
    light:{
        'sixty' : "#FFF9BF",
        'thirty' : "#FFCC6F",
        'ten' : "#FF2D2D",
        'text' : "#000000",
        'shadow' : "#FF2D2D48",
        'invert' : "0",
    },
    dark:{
        'sixty' : "#110B50",
        'thirty' : "#3C5095",
        'ten' : "#2BE5F1",
        'text' : "#FFFFFF",
        'shadow' : "#3C5095B0",
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