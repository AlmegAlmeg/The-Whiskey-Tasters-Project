import { useEffect } from 'react'
import { useContext, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { UserContext } from '../../App'
import FormInput from '../../Components/Form/FormInput/FormInput'
import Loader from '../../Components/Shared/Loader/Loader'
import ROUTES from '../../Config/routes'
import { useValidation } from '../../Hooks/useValidation'
import { reviewsSchema } from '../../Models/schema'
import { getReviewDetails, updateReview } from '../../Services/reviews'
import './EditReview.scss'

const EditReview = () => {
    const { id } = useParams()

    const [currentReview, setCurrentReview] = useState({
        title: '',
        subtitle: '',
        rating: '',
        imageUrl: '',
        description: '',
    }) 

    const ratingsArr = [1,2,3,4,5,6,7,8,9,10]
    
    useEffect(() => {
        try {
            getReviewDetails(id).then(res => {
                setCurrentReview({
                    title: res.data.review.title,
                    subtitle: res.data.review.subtitle,
                    rating: res.data.review.rating,
                    imageUrl: res.data.review.imageUrl,
                    description: res.data.review.description,
                })
            })
        } catch (err) {
            console.log(err)
        }
    }, [])
    
    const [isLoading, setIsLoading] = useState(false)

    const [isCreated, setIsCreated] = useState(false)

    const { data, errors, handleChange } = useValidation(currentReview, reviewsSchema)
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const body = data
            for(let property in body){
                if(body[property] === '') body[property] = currentReview[property]
            }
            await updateReview(id, body)
            setIsCreated(true)
        } catch (err) {
            setIsLoading(false)
            console.log(err)
        }
    }

    const currentUser = useContext(UserContext)
    if(!currentUser || (!currentUser.reviewer && currentUser.adminLevel === 0) ) return <Navigate to='/'/>
    if(isCreated) return <Navigate to={ROUTES.REVIEWS}/>

    return (
        <form onSubmit={(e) => handleSubmit(e)} className='new-review-form'>
            {isLoading && <Loader />}
            <h3 className='form-headline'>Update</h3>
            <FormInput 
                errors={errors}
                handleChange={handleChange}
                label='Review Title'
                name='title'
                defaultValue={currentReview.title}
            />
            <FormInput 
                errors={errors}
                handleChange={handleChange}
                required={false}
                label='Subtitle'
                name='subtitle'
                defaultValue={currentReview.subtitle}

                />
            <div className='form-rating'>
                <label htmlFor="rating">Rate:</label>
                <select name="rating" id='rating' onChange={(e) => {
                    handleChange(e)
                }}>
                    <option selected disabled>Choose your rating</option>
                    {ratingsArr.map((num, i) => {
                        return <option key={i} selected={currentReview.rating === num} value={num}>{num}</option>
                    })}
                </select> / 10
            </div>
            <FormInput 
                errors={errors}
                handleChange={handleChange}
                label='Image URL'
                name='imageUrl'
                defaultValue={currentReview.imageUrl}

            />
            <label htmlFor="description" className='desc-label'><span className='field-required'>*</span>Review body</label>
            <textarea name="description" defaultValue={currentReview.description}  id="description" cols="30" rows="10" onChange={(e) => {
                handleChange(e)
            }}></textarea>


            <div className='form-btn'>
                <button className='g-main-button'>
                    Update
                </button>
            </div>
        </form>
    )
}

export default EditReview