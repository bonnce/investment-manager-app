import { InstallButton } from "components"
import { useDeferredPrompt } from "misc"

const InstallApp = ()=>{
    const deferredPrompt = useDeferredPrompt()
    return <>
        <InstallButton/>

    </>
}

export default InstallApp