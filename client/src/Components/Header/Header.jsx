import './Header.scss'
import BurgerButton from './BurgerButton/BurgerButton'
import Logo from './Logo/Logo'
import Menu from './Menu/Menu'
import { useState } from 'react'

const Header = () => {
    const [toggleMenu, setToggleMenu] = useState(false)
    return (
        <header className='app-header'>
            <div className="main-content navigation">
                <Logo/>
                <nav>
                    <Menu toggleMenu={toggleMenu} setToggleMenu={setToggleMenu}/>
                    <BurgerButton toggleMenu={toggleMenu} setToggleMenu={setToggleMenu}/>
                </nav>
            </div>
        </header>
    )
}
 
export default Header