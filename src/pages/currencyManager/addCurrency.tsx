import { Card, Form } from "components"
import { Database, iCurrency, NAMECOLLCURRENCY, save } from "misc"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"

const INPUTS = [{name:"name",label:'Nombre'}, {name:"shortName",label:'Apodo'}]
const AddCurrency = ()=>{
    const navigate = useNavigate()
    const db = useContext(Database)
    const handleSubmit = async (formData:iCurrency)=>{
        if(db){
            const result = await save(db,NAMECOLLCURRENCY,formData)
            navigate(0)
        }
    }
return <Card>
    <div className="container column gap-md">
        <h2 className="form-title">Agregar Moneda</h2>
        <Form inputs={INPUTS} onSubmit={handleSubmit}/>
    </div>
</Card>
}
export default AddCurrency