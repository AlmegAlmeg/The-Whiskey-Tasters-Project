import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../../App'
import ROUTES from '../../../Config/routes'
import { likeReview } from '../../../Services/reviews'
import CreatedByCard from '../CreatedByCard/CreatedByCard'
import DeletePopup from '../DeletePopup/DeletePopup'
import './ReviewDetailsComponent.scss'

const ReviewDetailsComponent = ({ data: { review, user } }) => {

    const [isPopupOpen, setIsPopupOpen] = useState(false)
    const [likesCount, setLikesCount] = useState(review.likes.length)
    const [isLiked, setIsLiked] = useState(null)
    const currentUser = useContext(UserContext)

    useEffect(() => {
        if(!currentUser) return
        let liked = review.likes.includes(currentUser.uniqeId)
        setIsLiked(liked)
    }, [review.likes])

    const handleLike = async () => {
        const res = await likeReview(review.reviewId)
        setLikesCount(res.data)
        setIsLiked(value => !value)
    }

    const condition = currentUser && (currentUser.uniqeId === review.creator || currentUser.adminLevel > 0)

    return (
        <div className="review-details-component">
            {isPopupOpen && <DeletePopup id={review.reviewId} setIsPopupOpen={setIsPopupOpen}/>}
            <img src={ review.imageUrl } alt='whiskey' />
            <h3>{ review.title }</h3>
            <h5>{ review.subtitle }</h5>

            <p>{ review.description }</p>

            <div className="score-and-likes">
                <p className='score'>Final Rating: { review.rating } / 10</p>
                <p>
                    { likesCount } Likes 
                </p>
            </div>
            { condition && <div className="reviewers-admins-section">
                <Link to={`${ROUTES.EDIT_REVIEW}/${review.reviewId}`} className='g-review-btn edit'>
                    <FontAwesomeIcon icon={faEdit}/> Edit
                </Link>
                <button className='g-review-btn g-delete' onClick={() => setIsPopupOpen(prev => !prev)}>
                    <FontAwesomeIcon icon={faTrash}/> Delete
                </button>
            </div> }
            {currentUser && <button className='like-btn' onClick={handleLike}>
                {isLiked ? 'Liked' : 'Like'}
            </button>}
            <h4>Created By:</h4>
            <CreatedByCard user={user} />
        </div>
    )
}

export default ReviewDetailsComponent