import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteReview } from '../../../Services/reviews'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRemove } from '@fortawesome/free-solid-svg-icons'
import Loader from '../Loader/Loader'
import './DeletePopup.scss'

const DeletePopup = ({ id, setIsPopupOpen }) => {

    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const handleDeleteReview = async () => {
        try {
            setIsLoading(true)
            await deleteReview(id)
            navigate(-1)
        } catch (err) {
            setIsLoading(false)
        }
    }

    return (
        <div className="delete-popup-wrapper">
            {isLoading && <Loader />}
            <div className="delete-popup">
                <span className='close-btn' onClick={() => setIsPopupOpen(false)}><FontAwesomeIcon icon={faRemove} /></span>
                <h4>Are you sure you want to delete this review?</h4>
                <p>You won't be able to undo this action</p>

                <div className="popup-btns">
                    <button className='popup-btn delete' onClick={handleDeleteReview}>Delete</button>
                    <button className='popup-btn' onClick={() => setIsPopupOpen(false)}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default DeletePopup