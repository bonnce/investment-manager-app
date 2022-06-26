import { InvisibleInput, LoadingIcon } from "components"
import { ChangeEventHandler, useContext, useEffect, useState, useTransition } from "react"
import { iCurrency, update, Database, iShopping, NAMECOLLSHOPPING, handleTotal, remove, NAMECOLLCURRENCY } from "misc"
import { PanCard } from "components"


const PurchaseCard = ({currency,actual, isDraggin, isInDZ} : 
    {currency?:iCurrency,actual:iShopping, isDraggin:(d:boolean)=>void, isInDZ:(str?:'left'|'right')=>void})=>{
    const db = useContext(Database)
    const [cost, setCost] = useState(actual?.cost || '')
    const [bought, setBought] = useState(actual?.bought  || '')
    const [total,setTotal] = useState(0)
    const [isPending, transition] = useTransition()


    const handleUpdate =async (newShopping:iShopping) => {
        if(db){
            const resultCost = await update(db,NAMECOLLSHOPPING,newShopping)
        }
    }

    const handleDelete = async ()=>{
        if(db && currency && actual.id){
            const resultDelete = await remove(db,NAMECOLLSHOPPING,actual.id)
            const messi = currency.shopping.filter(i=> actual.id !== i)
            const newCurrency = {...currency,shopping:messi}
            const resultCurrency = await update(db,NAMECOLLCURRENCY,newCurrency)
            console.log(resultCurrency,resultDelete)
        }
    }
    

    const handleChange:ChangeEventHandler<HTMLInputElement> = (e) =>{
        transition(()=>{
            const target = e.currentTarget
            switch(target.name){
                case 'cost':
                    setCost(target.value)
                    const newCost = {...actual,cost:target.value,bought}
                    handleUpdate(newCost)
                    return
                case 'bought':
                    setBought(target.value)
                    const newBought = {...actual,bought:target.value,cost}
                    handleUpdate(newBought)
                    return
            }
        })
    }

    useEffect(()=>{
        setTotal(handleTotal(cost,bought))
    },[cost,bought])

    return <PanCard onDeadZone={handleDelete} isDraggin={isDraggin} isInDZ={isInDZ}>
            <div className="container gap-sm purchase-card">
                <InvisibleInput defaultValue={cost} name='cost' label="precio comprado" className="cost" onChange={handleChange} />
                <div className="container column align-start">
                    <InvisibleInput defaultValue={bought} name='bought' label="adquirido" className="bought" onChange={handleChange} />
                    {isPending ? <LoadingIcon /> :<h6 className="usd">{total && `~$ ${total}`}</h6>}
                </div>
            </div>    
        </PanCard>
}

export default PurchaseCard