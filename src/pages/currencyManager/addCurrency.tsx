import { Card, Form } from "components"
import { Database, getAll, iCurrency, NAMECOLLCURRENCY, save } from "misc"
import { saveCurrency } from "misc/apiServices"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"

const INPUTS = [{name:"name",label:'Nombre'}, {name:"shortName",label:'Apodo'}]
const AddCurrency = ()=>{
    const navigate = useNavigate()
    const db = useContext(Database)
    const [error,setError] = useState<null | string>(null)
    const validateShortName = async (shortName:string)=>{
        if(db){
            const currencies = await getAll(db,'currencies') as iCurrency[]
            const shortNameExists = currencies?.filter(c => c.shortName === shortName).length > 0
            if(shortNameExists){
                setError('El apodo ya existe, debe elegir uno diferente')
            }
            return !shortNameExists
        }
    }
    const handleSubmit = async (formData:iCurrency)=>{
        if(db){
            const valid = await validateShortName(formData.shortName)
            if(valid){
                const curr = await saveCurrency(formData)
                await save(db,NAMECOLLCURRENCY,curr)
                navigate(0)
            } 
        }
    }
return <Card>
    <div className="container column gap-md">
        <h2 className="form-title">Agregar Moneda</h2>
        <Form inputs={INPUTS} onSubmit={handleSubmit}/>
        {error && <p className="label-text" style={{color:'red'}}>{error}</p>}
    </div>
</Card>
}
export default AddCurrency