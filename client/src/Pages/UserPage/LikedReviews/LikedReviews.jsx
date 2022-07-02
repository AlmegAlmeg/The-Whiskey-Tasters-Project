import SingleReview from '../../../Components/Shared/SingleReview/SingleReview'
import './LikedReviews.scss'

const LikedReviews = ({ user, reviews }) => {
    const likedArr = []
    reviews.forEach(review => {
        if(review.likes.includes(user.uniqeId)) likedArr.push(review)
    })

    return (
        <div className="liked-reviews-section">
            <h3>All your liked review:</h3>
            {likedArr.length === 0 ? 
                <h4>Seems like you don't have any liked reviews yet...</h4>
                : <div className='reviews-grid'>
                    {likedArr.map((review, i) => {
                        return <SingleReview key={i} review={review}/>
                    })}
                </div>
            }
        </div>
    )
}

export default LikedReviews