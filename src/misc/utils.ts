import { genericObj } from "./types"

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

const includesObj = <M extends genericObj>(arr:M[], obj1:M): boolean => arr.filter(obj2 => objEquals(obj2,obj1)).length > 0

const objEquals = (obj1:genericObj,obj2:genericObj):boolean => 
Object.entries(obj1).filter(([k,v1])=> {
  const v2:string |number|number[]|undefined = obj2?.[k]
  const areArrays = Array.isArray(v1) && Array.isArray(v2)
  return areArrays ? !arrayEquals(v1,v2) : v2 !== v1
}).length === 0

const arrayEquals = <T>(arr1:T[],arr2:T[]):boolean => arr1.length === arr2.length && arr1.filter((v,i)=> v !== arr2[i]).length === 0

const compareListsObjById = <M extends genericObj>(first: M[], second:M[]): [M[] | [], boolean] => {
  const remain = first.length - second.length
  return remain < 0 ? [second.filter(s => !includesObj(first,s)),true] :
  [first.filter(f => !includesObj(second,f)), false]
}

export{
  handleTotal,
  handleMenu,
  leftRate,
  timeout,
  compareListsObjById
} 