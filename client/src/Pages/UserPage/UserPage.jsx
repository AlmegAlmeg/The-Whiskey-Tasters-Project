import { useContext, useEffect, useState } from 'react'
import { Route, Routes, NavLink, Navigate } from 'react-router-dom'
import { UserContext } from '../../App'
import { getUserInfo } from '../../Services/users'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import ROUTES from '../../Config/routes'
import './UserPage.scss'

import MiniLoader from '../../Components/Shared/Loader/MiniLoader'
import Me from './Me/Me'
import Update from './Update/Update'
import Error404Page from '../Error404/Error404'

const UserPage = () => {
    const [user, setUser] = useState(null)
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    useEffect(()=>{
        getUserInfo().then(res => setUser(res.data))
    }, [])

    const currentUser = useContext(UserContext)
    if(!currentUser) return <Navigate to='/' />


    return (
        <section className={`user-page ${isMenuOpen ? 'open': null}`}>
            <div className="user-nav left">
                <ul>
                    <div className={`openMenuButton ${isMenuOpen && 'open'}`} onClick={()=> setIsMenuOpen(prev => !prev)}>
                        <FontAwesomeIcon icon={faAngleRight}/>
                    </div>
                    <li><NavLink activeclassname="active" to={ROUTES.USER_ME}>My Profile</NavLink></li>
                    <li><NavLink activeclassname="active" to={ROUTES.USER_LIKED_REVIEWS}>Liked Reviews</NavLink></li>
                    {currentUser && (currentUser.reviewer || currentUser.adminLevel !== 0) && 
                        <li>
                            <NavLink activeclassname="active" to={ROUTES.USER_MY_REVIEWS}>My Reviews</NavLink>
                        </li>
                    }
                    <li><NavLink activeclassname="active" to={ROUTES.USER_ME_UPDATE}>Update Profile</NavLink></li>
                    <li><NavLink activeclassname="active" to={ROUTES.LOGOUT}>Logout</NavLink></li>
                </ul>
            </div>
            <div className="routes right">
                {user ? 
                    <Routes>
                        <Route path='/me/:userName' element={<Me user={user} />} />
                        <Route path='/update/:userName' element={<Update user={user} />} />
                        <Route path='*' element={<Error404Page />}/>
                    </Routes>
                    : <MiniLoader />
                }
                
            </div>
        </section>
    )
}
 
export default UserPage