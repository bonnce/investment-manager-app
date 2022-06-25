import { useEffect, useState } from "react"

const useWindowDimensions = ()=>{
    const [dimension,setDimension] = useState({width:window.innerWidth,height:window.innerHeight})

    useEffect(()=>{

        const handleDimension = ()=>{
            setDimension({width:window.innerWidth,height:window.innerHeight})
        }

        document.addEventListener('resize',handleDimension)
        return ()=> document.removeEventListener('resize',handleDimension)
    },[])

    return dimension
}

export default useWindowDimensions