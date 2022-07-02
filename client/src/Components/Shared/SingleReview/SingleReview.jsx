import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../../App'
import ROUTES from '../../../Config/routes'
import './SingleReview.scss'

const SingleReview = ({ review: { imageUrl, title, rating, reviewId, creator } }) => {

    const currentUser = useContext(UserContext)

    const condition = currentUser && (currentUser.uniqeId === creator || currentUser.adminLevel > 0)

    return <div className="single-review-card" >
        <img src={imageUrl} alt="Whiskey" />
        <h4>{ title }</h4>
        <p>{ rating } / 10</p>
        <div className="btns">
            <Link className='g-review-btn read' to={`${ROUTES.REVIEWS}/${reviewId}`}>Read</Link>
            { condition && <Link to={`${ROUTES.EDIT_REVIEW}/${reviewId}`} className='g-review-btn g-edit'>
                <FontAwesomeIcon icon={faEdit}/> Edit
            </Link>}
        </div>
    </div>
        
}

export default SingleReview