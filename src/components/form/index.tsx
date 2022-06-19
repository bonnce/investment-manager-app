import { InputText, InputButton } from "components"

const Form = ({inputs} : {inputs:Array<{name:string, label:string}>}) => 
    <form className="container column gap-md">
        {inputs.map((obj) => <InputText name={obj.name} label={obj.label} key={obj.name} />  )}
        <InputButton name="Agregar" />
    </form>

export default Form