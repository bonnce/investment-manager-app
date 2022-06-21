import { Card } from "components";

const PurchaseCard = ()=>
<Card>
    <div className="container gap-sm">
        <div className="container column gap">
            <p className="purchase-label">precio pagado</p>
            <h4 className="cost">$39500.244</h4>
        </div>
        <div className="container column">
            <p className="purchase-label">adquirido</p>
            <h4 className="bought">$0.000056415165</h4>
            <h6 className="usd">~ $25</h6>
        </div>
    </div>    
</Card>

export default PurchaseCard