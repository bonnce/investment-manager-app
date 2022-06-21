import { PlusButton } from "components";
import { BasicAppPage } from "pages";
import PurchaseCard from "./purchaseCard";

const Currency = ({title} : {title:string}) =>{
    return <BasicAppPage title={title}>
        <div className="container column gap-lg">
                <PurchaseCard/>
                <PlusButton />
        </div>
            </BasicAppPage>
}

export default Currency