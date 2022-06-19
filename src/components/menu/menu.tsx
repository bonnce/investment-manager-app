import Header from 'components/header'
import { Theme } from 'misc'
import { useContext } from 'react'
import Navigation from './navigation'
import cross from 'assets/images/cross.svg'
import Burger from 'components/burger'


const Menu = ()=>{
    const theme = useContext(Theme)
    const handleClick = ()=>{
        const menu:HTMLDivElement|null = document.querySelector('.menu')
        if(menu)
          menu.style.left = '-36em'
      }
    return <div className='container column align-start menu' style={{backgroundColor:theme.sixty, boxShadow: `4px 0px 4px 0 ${theme.shadow}`}}>
        <div className='container gap-md align-start'>
            <Burger icon={cross} handleClick={handleClick}/>
            <h2>investment manager app</h2>
        </div>
        <Navigation/>
    </div>
}

export default Menu