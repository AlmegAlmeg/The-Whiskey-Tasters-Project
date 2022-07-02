import { useState } from 'react'
import FormInput from '../../../Components/Form/FormInput/FormInput'
import { useValidation } from '../../../Hooks/useValidation'
import { updateSchema, updateWithPassSchame } from '../../../Models/schema'
import { DEFAULT_PROFILE, updateUser, uploadProfilePhoto } from '../../../Services/users'
import Loader from '../../../Components/Shared/Loader/Loader'
import './Update.scss'
import UpdatePass from './UpdatePass'

const Update = ({ user }) => {
    let formData = new FormData()
    const updatedUser = {
        userName: user.userName,
        email: user.email,
    }
    const updatedUserWithPass = {
        ...updatedUser,
        password: '',
        newPassword: '',
        newPasswordConfirm: ''
    }

    const [profileImage, setProfileImage] = useState(process.env.REACT_APP_UPLOADS_FOLDER + user.profileImage)
    const [fileUploaded, setFileUploaded] = useState(false)
    const [isUpdatingPass, setIsUpdatingPass] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const { data, errors, validate, handleChange } = useValidation(isUpdatingPass ? updatedUserWithPass : updatedUser, isUpdatingPass ? updateWithPassSchame : updateSchema)

    const proccesImage = async (e) => {
        const [file] = e.target.files
        formData.append('profile', file)
        const { data } = await uploadProfilePhoto(formData)
        setProfileImage(process.env.REACT_APP_UPLOADS_FOLDER + data)
        setFileUploaded(true)
    }

    const validateBtn = () => {
        if(!isUpdatingPass) {
            delete data.password
            delete data.newPassword
            delete data.newPasswordConfirm
        }
        const result = validate(data)
        if(result) return true
        return false
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        
        try {
            if(data.newPassword !== data.newPasswordConfirm)
                return setError('Passwords does not match')
            setIsLoading(true)
            updatedUserWithPass.newPasswordConfirm = data.newPasswordConfirm
            delete data.newPasswordConfirm
            await updateUser(data)
            window.location = '/'
        } catch (err) {
            data.newPasswordConfirm =  updatedUserWithPass.newPasswordConfirm
            setIsLoading(false)
            setError(err.response.data)
        }
    }

    return (
        <div className="update-form">
            {isLoading && <Loader />}
            <form onSubmit={(e) => handleSubmit(e)}>
                <h3>Update your profile</h3>
                <img src={user.profileImage ? profileImage : DEFAULT_PROFILE} alt="profile" /> 
                
                {fileUploaded ? <p>Press the 'Upload' button to set changes</p>: <label className='file-custom'>
                    Choose file...
                    <input className='upload-input' type="file" name='image'  onChange={(e)=> proccesImage(e)}/>
                </label> }
                 <FormInput 
                    defaultValue={updatedUser.userName}
                    errors={errors} 
                    label={"Username"} 
                    name={'userName'} 
                    handleChange={handleChange} 
                />
                <FormInput 
                    defaultValue={updatedUser.email}
                    errors={errors} 
                    label={"Email"} 
                    name={'email'} 
                    handleChange={handleChange} 
                />
                <span className='update-pass-button' onClick={()=> setIsUpdatingPass(prev => !prev)}>Chane password?</span>
                {UpdatePass(isUpdatingPass, handleChange, errors, setIsUpdatingPass)}
                {error && <span className='error-handler'>{error}</span>}
                <div className='form-btn'>
                    <button 
                        className={`${validateBtn()?'g-main-button-disabled':'g-main-button'}`} 
                        disabled={validateBtn()}>
                        Update
                    </button>
                </div>
            </form>
        </div>
    )
}
 
export default Update