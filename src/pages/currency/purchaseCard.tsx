import { Card } from "components";
import RoundUSD from "./roundUSD";

const PurchaseCard = ({cost, bought} : {cost:string, bought:string})=>
<Card>
    <RoundUSD costIncoming={cost} boughtIncoming={bought} /> 
</Card>

export default PurchaseCard