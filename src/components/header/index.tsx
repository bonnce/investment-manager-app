import { Burger } from "components"
import { handleMenu, Theme } from "misc"
import { useContext } from "react"
import burger from 'assets/images/burger.svg'
import sun from 'assets/images/sun.svg'
import cold from 'assets/images/cold.svg'


const Header = ({title}:{title:string})=> {
  const {theme,setTheme} = useContext(Theme)
  const handleMenuClick = () => handleMenu('0')
  return <div className="container header gap-md" style={{
    boxShadow: `0 4px 4px 0 ${theme.shadow}`
  }}>
      <Burger icon={burger} handleClick={handleMenuClick} />
      <h1>{title}</h1>
      <div className="container theme-icon">
        <Burger icon={theme.invert==='0' ? cold : sun} handleClick={setTheme} />
      </div>
  </div>}

export default Header