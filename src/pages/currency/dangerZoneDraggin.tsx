import { TrashZone } from "components";
import { timeout } from "misc";
import { useEffect, useState } from "react";

const DangerZoneDraggin = ({isDragging,dangerZone}:{isDragging: boolean| null, dangerZone?: 'left' | 'right'}) => {
    const [display, setDisplay] = useState(false)
    useEffect(()=>{
        const handleDisplay = async ()=>{
            if(isDragging){
                setDisplay(true)
            }else{
                await timeout(500)
                setDisplay(false)
            }
        }
        handleDisplay()
    },[isDragging])
    return <>
    {isDragging === null || (display ?
    <>
        <TrashZone className={isDragging ? 'fade-in' : 'fade-out'} close={dangerZone === 'right'} />
        <TrashZone className={isDragging ? 'fade-in' : 'fade-out'} left close={dangerZone === 'left'}/>
    </>
    : null)}
    </>
}

export default DangerZoneDraggin