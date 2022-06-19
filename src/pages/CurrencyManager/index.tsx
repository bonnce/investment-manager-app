import { Card, Form } from "components"
import { BasicAppPage } from "pages"

const INPUTS = [{name:"name",label:'Nombre'}, {name:"shortName",label:'Apodo'}]
const CurrencyManager = () => <BasicAppPage title="Administrar Monedas">
    <Card>
        <div className="container column gap-md">
            <h2 className="form-title">Agregar Moneda</h2>
            <Form inputs={INPUTS} />
        </div>
    </Card>
</BasicAppPage>

export default CurrencyManager