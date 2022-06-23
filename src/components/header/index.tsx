import { ThemedIcon2x2, Icon2x2 } from "components"
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
      <ThemedIcon2x2 icon={burger} alt='burger' handleClick={handleMenuClick} />
      <h1 className="capitalize">{title}</h1>
      <div className="container theme-icon">
        <Icon2x2 icon={theme.invert==='0' ? cold : sun} alt={theme.invert==='0' ? 'cold' : 'sun'} handleClick={setTheme} />
      </div>
  </div>}

export default Header