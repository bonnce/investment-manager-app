import { InvisibleInput, LoadingIcon } from "components"
import { ChangeEventHandler, useEffect, useState, useTransition } from "react"


const RoundUSD = ({costIncoming, boughtIncoming} : {costIncoming:string, boughtIncoming:string})=>{
    const [cost, setCost] = useState(costIncoming || '')
    const [bought, setBought] = useState(boughtIncoming || '')
    const [total,setTotal] = useState(0)
    const [isPending, transition] = useTransition()

    const handleChange:ChangeEventHandler<HTMLInputElement> = (e) =>{
        transition(()=>{
            const target = e.currentTarget
            if(target.name === 'cost') setCost(target.value)
            if(target.name === 'bought') setBought(target.value)
        })
    }

    const handleTotal= (cost:string,bought:string)=>{
        if(cost === '' || bought === '') return 0
        return Math.round(parseFloat(cost) * parseFloat(bought) *100)/100
    }

    useEffect(()=>{
        setTotal(handleTotal(cost,bought))
    },[cost,bought])

    return <div className="container gap-sm purchase-card">
                <InvisibleInput defaultValue={costIncoming} name='cost' label="precio comprado" className="cost" onChange={handleChange} />
                <div className="container column align-start">
                    <InvisibleInput defaultValue={boughtIncoming} name='bought' label="adquirido" className="bought" onChange={handleChange} />
                    {isPending ? <LoadingIcon /> :<h6 className="usd">{total && `~$ ${total}`}</h6>}
                </div>
            </div>    
}

export default RoundUSD