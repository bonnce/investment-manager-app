import { Footer, PlusButton } from "components";
import { TrashZone } from "components/card";
import DangerLines from "components/card/dangerLines";
import { Database, get, iCurrency, NAMECOLLCURRENCY, iShopping, update, INDEXSHOPPINGDB, NAMECOLLSHOPPING, save, iScore, handleTotal } from "misc";
import { useContext, useEffect, useMemo, useState } from "react";
import PurchaseCard from "./purchaseCard";

const AddCard = ({id}:{id?:number}) =>{
    const db = useContext(Database)
    const [data,setData] = useState<iCurrency | undefined>(undefined)
    const [cards,setCards] = useState<iShopping[]>([])
    const [scores,setScores] = useState<Array<iScore>>([])
    const [isDrag,setIsDrag] = useState(false)

    const handleScore = (scores:iScore[])=>{
        setScores(scores)
    }

    const handleDrag = (drag:boolean)=>{
        setIsDrag(drag)
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
			setCards(c=> [...c,newShopping])
			const resultShopping = await save(db,NAMECOLLSHOPPING,newShopping)
			if(typeof resultShopping === 'number'){
				const newCurrency = {...data, shopping: [...data.shopping,resultShopping]}
				const result = await update(db,NAMECOLLCURRENCY,newCurrency)
			}
		} 
    }
    

    
    useEffect(()=>{
        const getData = async ()=>{
            if(db && id){
                const rawDataCurrency = await get(db,NAMECOLLCURRENCY,id) as iCurrency
                setData(rawDataCurrency)
				if(rawDataCurrency.shopping.length > 0){
					const rawDataShopping = await db.getAllFromIndex(NAMECOLLSHOPPING,INDEXSHOPPINGDB,id) as iShopping[]
					setCards(rawDataShopping)
				}
			}
        }
        getData()
        handleScore(memo)
    },[db,id,memo])


    
    return <div className="container column gap-lg">

            {isDrag &&
            <>
                {/* <DangerLines  /> */}
                {/* <DangerLines left={false} /> */}

            </>
            }
                <TrashZone />
                <TrashZone left/>
            {cards.map((d,i)=><PurchaseCard currency={data} isDraggin={handleDrag} actual={d} key={`${d.id}-${d.bought}-${i}`} />)}
            <PlusButton className="purchase-button" onClick={handleClick} />
            <Footer scores={scores} />
        </div>
}

export default AddCard