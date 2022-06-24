import { leftRate, Theme } from "misc"
import React, { SyntheticEvent, useContext } from "react"

const PanCard = ({children} : {children:React.ReactNode})=>{
    const {theme} = useContext(Theme)

    const zoom = (target:HTMLDivElement)=>{
        target.style.transform = 'scale(1.2)'
    }

    const drag = (target:HTMLDivElement,clientX:number) =>{
        const centerTarget = clientX - (target.clientWidth/2)

        target.style.position = 'absolute'
        target.style.left = `${centerTarget}px`
        
        const topDeadZone = window.innerWidth * 0.7 
        const bottomDeadZone = window.innerWidth * 0.3

        if(topDeadZone < clientX){
            const opacity = leftRate(window.innerWidth*0.9,topDeadZone,clientX)
            target.style.opacity = `${opacity}`
        }
        if(bottomDeadZone > clientX){
            const opacity = leftRate(window.innerWidth*0.1,bottomDeadZone,clientX)
            target.style.opacity = `${opacity}`
        }
    }

    const reset = (target:HTMLDivElement) => {
        target.style.opacity = '1'
        target.style.position = 'static'
        target.style.transform = 'none'
    }

    const inDeadZone = (clientX:number) =>{
        const topDeadZone = window.innerWidth * 0.9
        const bottomDeadZone = window.innerWidth * 0.1
        return clientX > topDeadZone || clientX < bottomDeadZone
    }

    const handleTouchMove:React.TouchEventHandler<HTMLDivElement> = (e)=>{
        const touch = e.targetTouches[0]
        const target = touch.target as HTMLDivElement
        drag(target,touch.clientX)
    }

    const handleTouchEnd:React.TouchEventHandler<HTMLDivElement> = (e)=>{
        const target = e.target as HTMLDivElement
        const touch = e.changedTouches[0]

        reset(target)
        const dead = inDeadZone(touch.clientX)

        if(dead) alert("you're dead")
    }
    
    const handleTouchStart:React.TouchEventHandler<HTMLDivElement> = (e)=>{
        const target = e.target as HTMLDivElement
        zoom(target)
    }

    const handleMouseDown:React.MouseEventHandler<HTMLDivElement> = (e)=>{
        const target = e.target as HTMLDivElement
        zoom(target)
        target.addEventListener('mousemove',handleMouseMove)
    }

    const handleMouseUp:React.MouseEventHandler<HTMLDivElement> = (e)=>{
        const target = e.target as HTMLDivElement

        target.removeEventListener('mousemove',handleMouseMove)
        reset(target)
        const dead = inDeadZone(e.clientX)

        if(dead) alert("you're dead")
    }

    const handleMouseLeaves:React.MouseEventHandler<HTMLDivElement> = (e)=>{
        const target = e.target as HTMLDivElement

        target.removeEventListener('mousemove',handleMouseMove)
        reset(target)
    }

    const handleMouseMove = (ev: MouseEvent)=>{
        const t = ev.target as HTMLDivElement
        drag(t,ev.clientX)
    }

    return <div className="container card pan-card" onTouchMove={handleTouchMove} 
    onTouchEnd={handleTouchEnd} onTouchStart={handleTouchStart} onTouchCancel={handleTouchEnd}
    onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onMouseLeave={handleMouseLeaves}
    style={{backgroundColor: theme.thirty, boxShadow: `0 4px 4px 0 ${theme.shadow}`}}>
        {children}
    </div>
}

export default PanCard