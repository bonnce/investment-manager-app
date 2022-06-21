import { Card, Form } from "components"

const INPUTS = [{name:"name",label:'Nombre'}, {name:"shortName",label:'Apodo'}]
const AddCurrency = ()=>
<Card>
    <div className="container column gap-md">
        <h2 className="form-title">Agregar Moneda</h2>
        <Form inputs={INPUTS} />
    </div>
</Card>

export default AddCurrency