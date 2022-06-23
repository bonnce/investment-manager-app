import { Theme } from "misc"
import { ChangeEventHandler, useContext, useEffect, useId, useState } from "react"

const InvisibleInput = ({name, label,onChange,className, defaultValue} : 
    {name:string,className?:string, label:string,onChange?:ChangeEventHandler<HTMLInputElement>,defaultValue:string})=>{
    const id = useId()
    const [value,setValue] = useState(defaultValue || '')
    const handleChange:ChangeEventHandler<HTMLInputElement> = (e)=>{
        setValue(e.currentTarget.value)
        onChange?.(e)
    }

    useEffect(()=>{
        setValue(defaultValue)
    },[defaultValue])

    const inputClassName = `container column align-start gap-xsmr ${className || ''}`
    const {theme} = useContext(Theme)
    return <div className={inputClassName}>
        <label htmlFor={id} className='label-invisible-text' style={{color:theme.text}}>
            {label}
        </label>
        <div className="container invisible-input gap-xsmr">
            <p className="prefix-invisible-text">$</p>
            <input type="number" name={name} id={id} value={value} 
            className='input-invisible-text' onChange={handleChange} placeholder='insert value'
            style = {{color:theme.text}} />
        </div>
        
    </div>
}

export default InvisibleInput