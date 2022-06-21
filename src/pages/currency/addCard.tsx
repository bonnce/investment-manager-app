import { PlusButton } from "components";
import { useState } from "react";
import PurchaseCard from "./purchaseCard";

const ARRAY =[{cost:'39550',bought:'0.00057'},{cost:'39550',bought:'0.0007'},{cost:'35777',bought:'0.00057'}]

const AddCard = () =>{
    const [cards,setCards] = useState<Array<{cost:string,bought:string}>>(ARRAY)
    const handleClick = ()=>{
        setCards(c=>[...c,{cost:'',bought:''}])
    }
    return <div className="container column gap-lg">
                {cards.map((d)=><PurchaseCard cost={d.cost} bought={d.bought} />)}
                <PlusButton onClick={handleClick} />
        </div>
}

export default AddCard