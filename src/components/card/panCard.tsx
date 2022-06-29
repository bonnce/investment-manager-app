import { leftRate, Theme, useWindowDimensions } from "misc"
import React, { useContext, useEffect, useRef, useState } from "react"

const PanCard = ({children, onDeadZone, isDraggin, isInDZ} : 
    {children:React.ReactNode, onDeadZone?:VoidFunction, isDraggin:(d:boolean)=>void, isInDZ:(str?:'left'|'right')=>void})=>{
    const {theme} = useContext(Theme)
    const {width, height} = useWindowDimensions()
    const panRef = useRef<HTMLDivElement>(null)
    const [isDrag,setIsDrag] = useState<boolean | null>(null)
    

    useEffect(()=>{
        const zoom = (target:HTMLDivElement,clientX:number,clientY:number)=>{
            if(target.dataset.drag){ 
                isDraggin(true)
                setIsDrag(true)  
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
                setIsDrag(false)
                isDraggin(false)
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
            const topDeadZone = width * 0.85
            const bottomDeadZone = width * 0.15
            return clientX > topDeadZone || clientX < bottomDeadZone
        }
    
        const handleTouchMove = (e:TouchEvent)=>{
            e.preventDefault()
            const touch = e.targetTouches[0]
            const target = touch.target as HTMLDivElement
            drag(target,touch.clientX,touch.clientY)
        }
    
        const handleTouchEnd = (e:TouchEvent)=>{
            
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
        }
        const handleMouseMove = (ev: MouseEvent)=>{
            const t = ev.target as HTMLDivElement
            drag(t,ev.clientX,ev.clientY)
        }
        const handleMouseDownEvent = (e:MouseEvent)=>{
            const target = e.target as HTMLDivElement
            target.childNodes.forEach(c=>{
                const child = c as HTMLElement
                child.style.pointerEvents= 'none'
            })
            zoom(target,e.clientX,e.clientY)
        }
        
        const handleMouseLeavesEvent = (e:MouseEvent)=>{

            const target = e.target as HTMLDivElement
            target.childNodes.forEach(c=>{
                const child = c as HTMLElement
                child.style.pointerEvents= 'fill'
            })
            reset(target)
            const dead = inDeadZone(e.clientX)
            if(dead) onDeadZone?.()
        }

        if(panRef.current){
            panRef.current.addEventListener('mousedown',handleMouseDownEvent)
            panRef.current.addEventListener('mousemove',handleMouseMove)
            isDrag === null || (() =>{
                panRef.current.addEventListener('mouseup',handleMouseLeavesEvent)
                panRef.current.addEventListener('mouseleave',handleMouseLeavesEvent)
                panRef.current.addEventListener('touchcancel',handleTouchEnd)
                panRef.current.addEventListener('touchend',handleTouchEnd)   
            })()
            panRef.current.addEventListener('touchstart',handleTouchStart)
            panRef.current.addEventListener('touchmove',handleTouchMove)
        }
        const actualRef = panRef.current

        return ()=>{
                actualRef?.removeEventListener('mousedown',handleMouseDownEvent)
                actualRef?.removeEventListener('mousemove',handleMouseMove)
                actualRef?.removeEventListener('mouseup',handleMouseLeavesEvent)
                actualRef?.removeEventListener('mouseleave',handleMouseLeavesEvent)
                actualRef?.addEventListener('touchstart',handleTouchStart)
                actualRef?.addEventListener('touchmove',handleTouchMove)
                actualRef?.addEventListener('touchcancel',handleTouchEnd)
                actualRef?.addEventListener('touchend',handleTouchEnd)
        }
    },[isDrag,width,height])

    return <div ref={panRef} className="container card pan-card" data-drag={true}
    style={{backgroundColor: theme.thirty, boxShadow: `0 2px 2px 0 ${theme.ten}80, 0 4px 4px 0 ${theme.thirty}`, 
    borderRight:`5em solid ${theme.ten}`}}>
        {children}
    </div>
}

export default PanCard