import { Burger } from "components"
import { Theme } from "misc"
import { useContext } from "react"
import burger from 'assets/images/burger.svg'


const Header = ({title}:{title:string})=> {
  const theme = useContext(Theme)
  const handleClick = ()=>{
    const menu:HTMLDivElement|null = document.querySelector('.menu')
    if(menu)
      menu.style.left = '0'
  }
  return <div className="container header gap-md" style={{
    boxShadow: `0 4px 4px 0 ${theme.shadow}`
  }}>
      <Burger icon={burger} handleClick={handleClick} />
      <h1>{title}</h1>
  </div>}

export default Header