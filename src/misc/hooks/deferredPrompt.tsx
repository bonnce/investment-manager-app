import { BeforeInstallPromptEvent } from "misc"
import { Dispatch, SetStateAction, useEffect, useState } from "react"

const useDeferredPrompt = ():[BeforeInstallPromptEvent|null,Dispatch<SetStateAction<BeforeInstallPromptEvent | null>>]=>{
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent|null>(null)
    const handleInstallPrompt = (e:BeforeInstallPromptEvent)=>{
        e.preventDefault()
        setDeferredPrompt(e)
    }
    useEffect(()=>{
        window.addEventListener('beforeinstallprompt', handleInstallPrompt)
    },[])  
    return [deferredPrompt,setDeferredPrompt]
}

export default useDeferredPrompt