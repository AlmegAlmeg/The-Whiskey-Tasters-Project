import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../../App'
import ROUTES from '../../../Config/routes'
import './AvatarMenu.scss'


const AvatarMenu = ({ openAvatarMenu }) => {
    const currentUser = useContext(UserContext)
    return (
        <div className='avatar-menu-wrapper' onClick={openAvatarMenu}>
            <ul className='avatar-menu'>
                <li><Link to={ROUTES.USER_ME}>My Profile</Link></li>
                <li><Link to={ROUTES.USER_ME_UPDATE}>Update Details</Link></li>
                {currentUser && (currentUser.reviewer || currentUser.adminLevel !== 0) &&
                    <li><Link to={ROUTES.USER_MY_REVIEWS}>Your reviews</Link></li>
                }
                {currentUser && currentUser.adminLevel !== 0 && <li><Link to={ROUTES.ADMIN_OVERVIEW}>Admin Panel</Link></li>}
                <li><Link to={ROUTES.LOGOUT}>Logout</Link></li>
            </ul>
        </div>
    )
}
 
export default AvatarMenu