import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from '../../App'
import './NewReview.scss'

const NewReview = () => {
    const currentUser = useContext(UserContext)
    if(!currentUser || !currentUser.reviewer) return <Navigate to='/'/>
    
    return (
        <>This is new reviewsssss</>
    )
}

export default NewReview