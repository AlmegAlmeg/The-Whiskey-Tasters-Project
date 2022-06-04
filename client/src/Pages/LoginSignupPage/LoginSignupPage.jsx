import { useState, useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from '../../App'
import './LoginSignupPage.scss'
import Login from '../../Components/Form/Login/Login.jsx'
import Signup from '../../Components/Form/Signup/Signup.jsx'
import Loader from '../../Components/Shared/Loader/Loader'

const LoginSignupPage = () => {
    const [loginOn, setLoginOn] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const currentUser = useContext(UserContext)

    const flipCard = () => {
        setLoginOn(prevValue => !prevValue)
        const loginForm = document.querySelector('.login')
        const signupForm = document.querySelector('.signup')
        loginForm.classList.toggle('login-flipped')
        signupForm.classList.toggle('signup-flipped')
    }

    return (
        <section className='login-signup-section'>
            {isLoading && <Loader />}
            {currentUser && <Navigate to='/'/>}
            <div>
                <h3 className='login-signup-page-headline'>{loginOn ? 'Login to': 'Signup Into'} our system:</h3>
                <p className='login-toggler' onClick={flipCard}>
                    {loginOn ? 'Don\'t have an account?': 'Already signed up?'}
                    <span>{loginOn ? ' Signup' : ' Login'}</span>
                </p>
                <div className='flipper flipped'>
                    <Login setIsLoading={setIsLoading} />
                    <Signup setIsLoading={setIsLoading} />
                </div>
            </div>
        </section>
    )
}
 
export default LoginSignupPage