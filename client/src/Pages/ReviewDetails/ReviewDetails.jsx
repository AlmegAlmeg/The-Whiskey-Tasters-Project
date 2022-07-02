import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getReviewDetails } from '../../Services/reviews'
import ReviewDetailsComponent from '../../Components/Shared/ReviewDetailsComponent/ReviewDetailsComponent'
import MiniLoader from '../../Components/Shared/Loader/MiniLoader'

import './ReviewDetails.scss'

const ReviewDetails = () => {

    const { id } = useParams()

    const [data, setData] = useState()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        getReviewDetails(id).then(res => {
            setData(res.data)
            setIsLoading(false)
        })
    }, [])

    return (
        <div className="review-container">
            {isLoading && <MiniLoader />}
            {data && <ReviewDetailsComponent data={data} />}
        </div>
    )
}

export default ReviewDetails