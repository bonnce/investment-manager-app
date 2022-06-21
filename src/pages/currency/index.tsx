import { BasicAppPage } from "pages";
import AddCard from "./addCard";

const Currency = ({title} : {title:string}) =>{
    return <BasicAppPage title={title}>
        <AddCard />
            </BasicAppPage>
}

export default Currency