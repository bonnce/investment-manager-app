import { BasicButton } from "components"
import { DeferredPrompt } from "misc"
import { useContext } from "react"

const InstallApp = ()=>{
    const {deferredPrompt,setDeferredPrompt} = useContext(DeferredPrompt)
    const handleClick = ()=>{
        deferredPrompt?.prompt()
        setDeferredPrompt(null)
    }
    return <>
        {deferredPrompt &&
        <BasicButton className="install-button" onClick={handleClick}>
            Install
        </BasicButton>
        }

    </>
}

export default InstallApp