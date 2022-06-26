import { leftRate, Theme, useWindowDimensions } from "misc"
import React, { useContext, useEffect, useRef, useState } from "react"

const PanCard = ({children, onDeadZone, isDraggin, isInDZ} : 
    {children:React.ReactNode, onDeadZone?:VoidFunction, isDraggin:(d:boolean)=>void, isInDZ:(str?:'left'|'right')=>void})=>{
    const {theme} = useContext(Theme)
    const {width, height} = useWindowDimensions()
    const panRef = useRef<HTMLDivElement>(null)
    const [isDrag,setIsDrag] = useState(false)
    

    useEffect(()=>{
        const zoom = (target:HTMLDivElement,clientX:number,clientY:number)=>{
            if(target.dataset.drag){   
                const targetWidth = target.getBoundingClientRect().width
                const targetHeight = target.getBoundingClientRect().height
                                
                target.style.position = 'absolute'
                target.style.top = `${clientY-(targetHeight/2)}px`
                target.style.left = `${clientX-(width - (width-(targetWidth/2)))}px`
                target.style.zIndex = '2'
                target.style.transform = 'scale(1.2)'
            }
        }
    
        const drag = (target:HTMLDivElement,clientX:number,clientY:number) =>{
            if(isDrag && target.dataset.drag){
                isInDZ()
                const body = document.querySelector('.body') as HTMLDivElement
                body.style.overflow = 'hidden'
                const targetHeight = target.getBoundingClientRect().height
                const targetWidth = target.getBoundingClientRect().width   
                
                target.style.top = `${clientY-(height-(height-(targetHeight/2)))}px`
                target.style.left = `${clientX-(width - (width-(targetWidth/2)))}px`

                
                const topDangerZone = width * 0.7 
                const bottomDangerZone = width * 0.3

                const topDeadZone = width * 0.85
                const bottomDeadZone = width * 0.15

                if(topDeadZone < clientX){
                    isInDZ('right')
                }
                if(bottomDeadZone > clientX){
                    isInDZ('left')
                }
                
                if(topDangerZone < clientX){
                    const opacity = leftRate(width*0.9,topDangerZone,clientX)
                    target.style.opacity = `${opacity}`
                }
                if(bottomDangerZone > clientX){
                    const opacity = leftRate(width*0.1,bottomDangerZone,clientX)
                    target.style.opacity = `${opacity}`
                }


            }
        }
    
        const reset = (target:HTMLDivElement) => {
            if( target.dataset.drag){
                const body = document.querySelector('.body') as HTMLDivElement
                body.style.overflowY = 'auto'
                
                target.style.opacity = '1'
                target.style.position = 'static'
                target.style.left = '0'
                target.style.transform = 'none'
                target.style.zIndex = '0'
            }
        }
    
        const inDeadZone = (clientX:number) =>{
            const topDeadZone = width * 0.9
            const bottomDeadZone = width * 0.1
            return clientX > topDeadZone || clientX < bottomDeadZone
        }
    
        const handleTouchMove = (e:TouchEvent)=>{
            const touch = e.targetTouches[0]
            const target = touch.target as HTMLDivElement
            drag(target,touch.clientX,touch.clientY)
        }
    
        const handleTouchEnd = (e:TouchEvent)=>{
            setIsDrag(false)
            isDraggin(false)
            
            const target = e.target as HTMLDivElement
            const touch = e.changedTouches[0]
    
            reset(target)
            const dead = inDeadZone(touch.clientX)
            if(dead) onDeadZone?.()
        }
        
        const handleTouchStart = (e:TouchEvent)=>{
            const target = e.target as HTMLDivElement
            const touch = e.changedTouches[0]
            zoom(target,touch.clientX,touch.clientY)
            setIsDrag(true)
            isDraggin(true)
        }
        const handleMouseMove = (ev: MouseEvent)=>{
            const t = ev.target as HTMLDivElement
            drag(t,ev.clientX,ev.clientY)
        }
        const handleMouseDownEvent = (e:MouseEvent)=>{
            isDraggin(true)
            setIsDrag(true)
            const target = e.target as HTMLDivElement
            target.childNodes.forEach(c=>{
                const child = c as HTMLElement
                child.style.pointerEvents= 'none'
            })
            zoom(target,e.clientX,e.clientY)
        }
        
        const handleMouseLeavesEvent = (e:MouseEvent)=>{
            setIsDrag(false)
            isDraggin(false)
            const target = e.target as HTMLDivElement
            target.childNodes.forEach(c=>{
                const child = c as HTMLElement
                child.style.pointerEvents= 'fill'
            })
            reset(target)
            const dead = inDeadZone(e.clientX)
            if(dead) onDeadZone?.()
        }

        const actualRef = panRef
        if(panRef.current){
            panRef.current.addEventListener('mousedown',handleMouseDownEvent)
            panRef.current.addEventListener('mousemove',handleMouseMove)
            panRef.current.addEventListener('mouseup',handleMouseLeavesEvent)
            panRef.current.addEventListener('mouseleave',handleMouseLeavesEvent)
            panRef.current.addEventListener('touchstart',handleTouchStart)
            panRef.current.addEventListener('touchmove',handleTouchMove)
            panRef.current.addEventListener('touchcancel',handleTouchEnd)
            panRef.current.addEventListener('touchend',handleTouchEnd)
        }
        return ()=>{
            if(actualRef.current){
                actualRef.current.removeEventListener('mousedown',handleMouseDownEvent)
                actualRef.current.removeEventListener('mousemove',handleMouseMove)
                actualRef.current.removeEventListener('mouseup',handleMouseLeavesEvent)
                actualRef.current.removeEventListener('mouseleave',handleMouseLeavesEvent)
                actualRef.current.addEventListener('touchstart',handleTouchStart)
                actualRef.current.addEventListener('touchmove',handleTouchMove)
                actualRef.current.addEventListener('touchcancel',handleTouchEnd)
                actualRef.current.addEventListener('touchend',handleTouchEnd)
            }
            document.removeEventListener('mousemove',handleMouseMove)
        }
    },[panRef.current,isDrag,width,height])

    return <div ref={panRef} className="container card pan-card" data-drag={true}
    style={{backgroundColor: theme.thirty, boxShadow: `0 2px 2px 0 ${theme.ten}80, 0 4px 4px 0 ${theme.thirty}`, 
    borderRight:`5em solid ${theme.ten}`}}>
        {children}
    </div>
}

export default PanCard