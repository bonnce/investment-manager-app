import { Footer, PlusButton } from "components";
import { Database, get, NAMECOLLCURRENCY, iShopping, update, INDEXSHOPPINGDB, NAMECOLLSHOPPING, save, iScore, handleTotal } from "misc";
import { saveShopping, updateCurrency } from "misc/apiServices";
import { CurrencyReal } from "misc/types";
import { useContext, useEffect, useMemo, useState } from "react";
import DangerZoneDraggin from "./dangerZoneDraggin";
import PurchaseCard from "./purchaseCard";

const ContainerCard = ({id}:{id?:number}) =>{
    const db = useContext(Database)
    const [data,setData] = useState<CurrencyReal | undefined>(undefined)
    const [cards,setCards] = useState<iShopping[]>([])
    const [scores,setScores] = useState<Array<iScore>>([])
    const [isDrag,setIsDrag] = useState<boolean | null>(null)
    const [dangerZone,setDZ] = useState<undefined | 'left' | 'right'>(undefined)
    const [loading, setLoading] = useState(false)

    const handleScore = (scores:iScore[])=>{
        setScores(scores)
    }

    const handleDrag = (drag:boolean)=>{
        setIsDrag(drag)
    }

    const handleDangerZone = (str?:'left' | 'right')=>{
        setDZ(str)
    }

    const memo = useMemo(()=>{
        
        const totalBought = cards.reduce((t,c)=>{
            const bought = c.bought === '' ? 0 : parseFloat(c.bought)
            return bought+t
        },0)
        const totalUSD = cards.reduce((t,c)=>{
            const total = handleTotal(c.cost,c.bought)
            return total+t  
        },0)

        const stopLoss = totalBought && Math.round((totalUSD/totalBought)*100)/100

        const scores = [{label:'gastado',total:totalUSD},{label:'salida',total:stopLoss}]
        return scores
    },[cards])

    const handleClick = async ()=>{
		if(db && data){
			const newShopping = {cost:'',bought:'',currency:data.id}
            const apiResult = await saveShopping(newShopping)
            console.log(apiResult)
			const resultShopping = await save(db,NAMECOLLSHOPPING,apiResult)
            console.log(resultShopping)
			if(typeof resultShopping === 'number'){
                setCards(c=> [...c,{...newShopping,id:resultShopping}])
                const newCurrency = {...data, shopping: [...data.shopping,resultShopping]}
				const result = await update(db,NAMECOLLCURRENCY,newCurrency)
                await updateCurrency(data.id,{shopping:newCurrency.shopping})
			}
		} 
    }
    

    
    useEffect(()=>{
        const getData = async ()=>{
            if(db && (id || id === 0)){
                const rawDataCurrency = await get(db,NAMECOLLCURRENCY,id) as CurrencyReal
                setData(rawDataCurrency)
                const rawDataShopping = await db.getAllFromIndex(NAMECOLLSHOPPING,INDEXSHOPPINGDB,id) as iShopping[]
                setCards(rawDataShopping)
			}
        }
        getData()
        handleScore(memo)
    },[db,id,memo])


    
    return <div className="container column gap-lg">
        
            <DangerZoneDraggin isDragging={isDrag} dangerZone={dangerZone} />
            {loading && <p>
                loading...
            </p>}
            {cards.map((d,i)=><PurchaseCard currency={data} isInDZ={handleDangerZone} 
            isDraggin={handleDrag} actual={d} key={`${d.id}-${i}`} />)}
            <PlusButton className="purchase-button" onClick={handleClick} />
            <Footer scores={scores} />
        </div>
}

export default ContainerCard