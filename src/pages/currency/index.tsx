import { BasicAppPage } from "pages";
import AddCard from "./containerCard"

const Currency = ({title,id} : {title:string,id?:number}) =>{
    
    return <BasicAppPage title={title}>
            <AddCard id={id} />
        </BasicAppPage>
}

export default Currency