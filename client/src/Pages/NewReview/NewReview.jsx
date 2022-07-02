import { useContext, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from '../../App'
import FormInput from '../../Components/Form/FormInput/FormInput'
import Loader from '../../Components/Shared/Loader/Loader'
import ROUTES from '../../Config/routes'
import { useValidation } from '../../Hooks/useValidation'
import { reviewsSchema } from '../../Models/schema'
import { createNewReview } from '../../Services/reviews'
import './NewReview.scss'

const NewReview = () => {
    const ratingsArr = [1,2,3,4,5,6,7,8,9,10]
    const review = {
        title: '',
        subtitle: '',
        rating: '',
        imageUrl: '',
        description: '',
    }
    
    const [isLoading, setIsLoading] = useState(false)

    const [isCreated, setIsCreated] = useState(false)

    const { data, errors, handleChange, validate } = useValidation(review, reviewsSchema)

    const validateBtn = () => {
        const result = validate(data)
        if(result) return true
        return false
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const body = data
            await createNewReview(body)
            setIsCreated(true)
        } catch (err) {
            setIsLoading(false)
        }
    }

    const currentUser = useContext(UserContext)
    if(!currentUser || (!currentUser.reviewer && currentUser.adminLevel === 0) ) return <Navigate to='/'/>
    if(isCreated) return <Navigate to={ROUTES.REVIEWS}/>

    return (
        <form onSubmit={(e) => handleSubmit(e)} className='new-review-form'>
            {isLoading && <Loader />}
            <h3 className='form-headline'>Create New Review</h3>
            <FormInput 
                errors={errors}
                handleChange={handleChange}
                label='Review Title'
                name='title'
            />
            <FormInput 
                errors={errors}
                handleChange={handleChange}
                required={false}
                label='Subtitle'
                name='subtitle'
                />
            <div className='form-rating'>
                <label htmlFor="rating">Rate:</label>
                <select name="rating" id='rating' onChange={(e) => {
                    handleChange(e)
                }}>
                    <option selected disabled>Choose your rating</option>
                    {ratingsArr.map((num, i) => {
                        return <option key={i} defaultValue={num}>{num}</option>
                    })}
                </select> / 10
            </div>
            <FormInput 
                errors={errors}
                handleChange={handleChange}
                label='Image URL'
                name='imageUrl'
            />
            <label htmlFor="description" className='desc-label'><span className='field-required'>*</span>Review body</label>
            <textarea name="description"  id="description" cols="30" rows="10" onChange={(e) => {
                handleChange(e)
            }}></textarea>


            <div className='form-btn'>
                <button 
                    className={`${validateBtn()?'g-main-button-disabled':'g-main-button'}`} 
                    disabled={validateBtn()}>
                    Create
                </button>
            </div>
        </form>
    )
}

export default NewReview