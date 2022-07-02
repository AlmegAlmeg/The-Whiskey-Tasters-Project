import SingleReview from '../../../Components/Shared/SingleReview/SingleReview'
import './MyReviews.scss'

const MyReviews = ({ user, reviews }) => {
    const myReviews = []
    reviews.forEach(review => {
        if(review.creator === user.uniqeId) myReviews.push(review)
    })

    return (
        <div className="liked-reviews-section">
            <h3>All your review:</h3>
            {myReviews.length === 0 ? 
                <h4>Seems like you don't have any reviews yet...</h4>
                : <div className='reviews-grid'>
                    {myReviews.map((review, i) => {
                        return <SingleReview key={i} review={review}/>
                    })}
                </div>
            }
        </div>
    )
}

export default MyReviews