import './Menu.scss'
import { NavLink } from "react-router-dom"
import { UserContext } from '../../../App'
import { useState, useEffect, useContext } from 'react'
import AvatarMenu from '../AvatarMenu/AvatarMenu'
import ROUTES from '../../../Config/routes'
import { DEFAULT_PROFILE } from '../../../Services/users'

const Menu = ({ toggleMenu, setToggleMenu }) => {

    const [isAvatarMenuOpen, setIsAvatarMenuOpen] = useState(false)

    const currentUser = useContext(UserContext)

    useEffect(()=>{
        openAvatarMenu()
    }, [])

    const openAvatarMenu = () => {
        const width = window.innerWidth
        if(width <= 600) return setIsAvatarMenuOpen(true)
        setIsAvatarMenuOpen(prevValue => !prevValue)
    }

    return (
        <ul className={`menu ${toggleMenu ? 'opened': null}`} onClick={()=> setToggleMenu(false)}>
            <li className='menu-li'><NavLink activeclassname="active" to={ROUTES.HOME}>Home</NavLink></li>
            <li className='menu-li'><NavLink activeclassname="active" to={ROUTES.ABOUT}>About Us</NavLink></li>
            <li className='menu-li'><NavLink activeclassname="active" to={ROUTES.REVIEWS}>Reviews</NavLink></li>
            {currentUser ? 
                <li className='menu-li'>
                    <button title={currentUser.userName} onClick={openAvatarMenu}>
                        <img className='profile-image' src={currentUser.profileImage ? process.env.REACT_APP_UPLOADS_FOLDER + currentUser.profileImage : DEFAULT_PROFILE} alt="profile" />
                    </button>
                    {isAvatarMenuOpen && <AvatarMenu openAvatarMenu={openAvatarMenu} />}
                </li>:
                <li className='menu-li'><NavLink activeclassname="active" to={ROUTES.LOGIN}>Login/Signup</NavLink></li>
            }
            {/* <DarkModeButton /> */}
        </ul>
    )
}
    
export default Menu