import { Card, Form } from "components"
import { Database, iCurrency, save } from "misc"
import { FormEventHandler, useContext } from "react"
import { useNavigate } from "react-router-dom"

const INPUTS = [{name:"name",label:'Nombre'}, {name:"shortName",label:'Apodo'}]
const AddCurrency = ()=>{
    const navigate = useNavigate()
    const db = useContext(Database)
    const handleSubmit = async (formData:iCurrency)=>{
        if(db){
            console.log(formData)
            const result = await save(db,formData)
            console.log(result)
            // navigate('/')
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