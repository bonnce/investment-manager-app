function handleMenu (size:string):void {
    const menu:HTMLDivElement|null = document.querySelector('.menu')
    if(menu)
      menu.style.left = size
}

const handleTotal= (cost:string,bought:string)=>{
  if(cost === '' || bought === '') return 0
  return Math.round(parseFloat(cost) * parseFloat(bought) *100)/100
}

const leftRate = (top:number,bottom:number,x:number) => (top-x)/(top-bottom)

const timeout = async (ms:number) => await new Promise(r => setTimeout(r,ms)) 

const includesObjById = <M extends { id: number}>(arr:M[], id:number): boolean => arr.filter(obj => obj.id === id).length > 0

const compareListsObjById = <M extends { id: number}>(first: M[], second:M[]): M[] | [] => {
  const remain = first.length - second.length
  return remain < 0 ? [] :
  first.filter(f => !includesObjById<M>(second,f.id))
}

export{
  handleTotal,
  handleMenu,
  leftRate,
  timeout,
  compareListsObjById
} 