import { InputText, InputButton } from "components"
import { iCurrency } from "misc"
import { ChangeEventHandler, FormEventHandler, useState } from "react"

const Form = ({inputs, onSubmit} : 
    {inputs:Array<{name:string, label:string}>,onSubmit?:(form:iCurrency)=>void}) => {

    const [formData,setFormData] = useState<iCurrency>({name:'',shortName:'',shopping:[]})

    const handleChange:ChangeEventHandler<HTMLInputElement> = (e)=>{
        const target = e.currentTarget
        const data = {
            [target.name]:target.value
        }
        setFormData((prev)=> ({...prev,...data}))
    }
    const handleSubmit:FormEventHandler<HTMLFormElement> = (e)=>{
        e.preventDefault()
        onSubmit?.({...formData,shopping:[]})
    }
    return <form className="container column gap-md" onSubmit={handleSubmit}>
        {inputs.map((obj) => <InputText name={obj.name} label={obj.label} key={obj.name} onChange={handleChange} />  )}
        <InputButton name="Agregar" />
    </form>
}
export default Form