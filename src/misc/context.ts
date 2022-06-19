import React from 'react'

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
        'shadow' : "#2BE5F148",
        'invert' : "1",
    }
}

const Theme = React.createContext(themes.light)

export{
    themes,
    Theme
}