import { useState } from 'react'
import { useValidation } from '../../../Hooks/useValidation'
import { signupSchema } from '../../../Models/schema'
import { login, signup } from '../../../Services/users'
import FormInput from '../FormInput/FormInput'

const Signup = ({ setIsLoading }) => {
    
    const userSchema = {
        userName: '',
        email: '',
        password: '',
        passwordConfirm: '',
    }

    const [errHandler, setErrHandler] = useState('')
    const { data, errors, handleChange, validate } = useValidation(userSchema, signupSchema)

    const validateBtn = () => {
        const result = validate(data)
        if(result) return true
        return false
    }

    const checkPassMatch = (pass, passConf)=>{
        if (pass !== passConf) {
            setErrHandler('Your passwords does not match')
            return false
        }
        setErrHandler('')
        return true
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const user = {...data}
        const passMatch = checkPassMatch(user.password, user.passwordConfirm)
        if(!passMatch) return
        delete user.passwordConfirm
        try {
            setIsLoading(true)
            await signup(user)
            delete user.userName
            await login(user)
            window.location = '/'
        } catch (err) {
            setErrHandler(err.response.data)
            setIsLoading(false)
        }
    }

    return (
        <div className='signup'>
            <form className='form' onSubmit={(e) => handleSubmit(e)}>
                <FormInput 
                    errors={errors} 
                    label={"Username"} 
                    name={'userName'} 
                    handleChange={handleChange} 
                />
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
                <FormInput 
                    errors={errors} 
                    label={"Repeat password"} 
                    name={'passwordConfirm'} 
                    handleChange={handleChange} 
                    type={"password"}
                />
                {errHandler && <p className='err-handler'>{errHandler}</p>}
                <div className='form-btn'>
                    <button 
                        className={`${validateBtn()? 'g-main-button-disabled':'g-main-button'}`} 
                        disabled={validateBtn()}>
                        Signup
                    </button>
                </div>
            </form>
        </div>
    )
}
 
export default Signup;