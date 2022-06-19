import { Body, Header, Menu } from "components";
import React from "react";
import { useContext } from "react";
import { Theme } from "misc";

const BasicAppPage = ({title,children}:{title:string,children:React.ReactNode})=>{
const theme = useContext(Theme)
return <div style={{backgroundColor:theme.sixty, color:theme.text}} className='container column app'>
            <Menu/>
            <Header title={title}/>
            <Body>
                {children}
            </Body>
            </div>
}

export default BasicAppPage