import { BeforeInstallPromptEvent } from "misc"
import { useEffect, useState } from "react"

const useDeferredPrompt = ()=>{
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent|null>(null)
    const handleInstallPrompt = (e:BeforeInstallPromptEvent)=>{
        e.preventDefault()
        setDeferredPrompt(e)
    }
    useEffect(()=>{
        window.addEventListener('beforeinstallprompt', handleInstallPrompt)
    },[])  
    return deferredPrompt
}

export default useDeferredPrompt