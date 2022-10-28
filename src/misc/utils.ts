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

const compareLists = <T>(first:T[], second:Array<T>):Array<T> => {
  if(first.length >= second.length){
    return first.filter((f,i) => f !== second[i])
  }
}

export{
  handleTotal,
  handleMenu,
  leftRate,
  timeout
} 