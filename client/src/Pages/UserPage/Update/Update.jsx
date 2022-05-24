import { useState } from 'react'
import FormInput from '../../../Components/Form/FormInput/FormInput'
import { useValidation } from '../../../Hooks/useValidation'
import { updateSchema } from '../../../Models/schema'
import { uploadProfilePhoto } from '../../../Services/users'

const Update = ({ user }) => {
    let formData = new FormData()
    const updatedUser = {
        userName: user.userName,
        email: user.email,
    }

    const [profileImage, setProfileImage] = useState(user.profileImage)

    const { data, errors, validate, handleChange } = useValidation(updatedUser, updateSchema)

    const proccesImage = async (e) => {
        const [file] = e.target.files
        formData.append('profile', file)
        const { data } = await uploadProfilePhoto(formData)
        console.log(data)
        setProfileImage(data)
    }

    const validateBtn = () => {
        const result = validate(data)
        if(result) return true
        return false
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            console.log('sup')
        } catch (err) {
            console.log(err.response.data)
        }
    }

    return (
        <div className="update-form">
            <form onSubmit={(e) => handleSubmit(e)}>
                {/* //! HARD CODED FOR NOW */}
                <img src={profileImage} alt="profile" /> 
                <input type="file" name='image'  onChange={(e)=> proccesImage(e)} />
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
                <div className='form-btn'>
                    <button 
                        className={`${validateBtn()?   'g-main-button-disabled':'g-main-button'}`} 
                        disabled={validateBtn()}>
                        Update
                    </button>
                </div>
            </form>
        </div>
    )
}
 
export default Update