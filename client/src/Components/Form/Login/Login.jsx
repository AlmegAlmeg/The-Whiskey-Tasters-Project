import { useState } from 'react'
import { useValidation } from '../../../Hooks/useValidation'
import { loginSchema } from '../../../Models/schema'
import { login } from '../../../Services/users'
import FormInput from '../FormInput/FormInput'
import '../Form.scss'

const Login = ({ setIsLoading }) => {

    const userSchema = {
        email: '',
        password: ''
    }

    const [errHandler, setErrHandler] = useState('')

    const { data, errors, handleChange, validate } = useValidation(userSchema, loginSchema)

    const validateBtn = () => {
        const result = validate(data)
        if(result) return true
        return false
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const user = {...data}
        try {
            setIsLoading(true)
            await login(user)
            window.location = '/'
        } catch (err) {
            setErrHandler(err.response.data)
            setIsLoading(false)
        }
    }

    return (
        <div className='login'>
            <form className='form' onSubmit={(e) => handleSubmit(e)}>
                <FormInput 
                    errors={errors} 
                    label={"Email"} 
                    name={'email'} 
                    handleChange={handleChange} 
                />
                <FormInput 
                    errors={errors} 
                    label={"Password"} 
                    name={'password'} 
                    handleChange={handleChange} 
                    type={"password"}
                />
                {errHandler && <p className='err-handler'>{errHandler}</p>}
                <div className='form-btn'>
                    <button 
                        className={`${validateBtn()?   'g-main-button-disabled':'g-main-button'}`} 
                        disabled={validateBtn()}>
                        Login
                    </button>
                </div>
            </form>
        </div>
    )
}
 
export default Login;