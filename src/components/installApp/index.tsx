import { BasicButton } from "components"
import { useDeferredPrompt } from "misc"

const InstallApp = ()=>{
    const [deferredPrompt,setDeferredPrompt] = useDeferredPrompt()
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