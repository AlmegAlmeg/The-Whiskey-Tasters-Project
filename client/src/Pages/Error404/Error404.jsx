import { Link } from 'react-router-dom'
import './Error404.scss'

const Error404Page = () => {
    return (
        <div className='error-page'>
            <div>
                <h3 className='error-headline'>Opss...</h3>
                <p>Seems like you got here by mistake...</p>
            </div>
            <Link className='g-error-button' to='/'>Back To Homepage</Link>
        </div>
    )
}
 
export default Error404Page