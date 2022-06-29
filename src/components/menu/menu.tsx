import { handleMenu, Theme } from 'misc'
import { useContext } from 'react'
import Navigation from './navigation'
import cross from 'assets/images/cross.svg'
import {ThemedIcon2x2} from 'components'
import InstallApp from 'components/installApp'


const Menu = ()=>{
    const {theme} = useContext(Theme)
    const handleClick = () => handleMenu('-36em')
    return <div className='container column align-start gap-md menu' style={{backgroundColor:theme.sixty, boxShadow: `4px 0px 4px 0 ${theme.shadow}`}}>
        <div className='container gap-md align-start'>
            <ThemedIcon2x2 icon={cross} alt='cross' handleClick={handleClick}/>
            <h2 className='menu-title'>investment manager app</h2>
        </div>
        <Navigation handleLinkClick={handleClick} />
        <InstallApp/>
    </div>
}

export default Menu