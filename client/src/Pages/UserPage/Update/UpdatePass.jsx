import FormInput from '../../../Components/Form/FormInput/FormInput'
import './UpdatePass.scss'

const UpdatePass = (isUpdatingPass, handleChange, errors) => {
    return (
        <div className={`update-pass ${isUpdatingPass ? 'visible' : 'invisible'}`}>
            <FormInput 
                errors={errors} 
                label={"Password"} 
                name={'password'} 
                handleChange={handleChange}
                disabled={!isUpdatingPass}
                type={'password'}
            />
            <FormInput 
                errors={errors} 
                label={"New password"} 
                name={'newPassword'} 
                handleChange={handleChange}
                disabled={!isUpdatingPass}
                type={'password'}
            />
            <FormInput 
                errors={errors} 
                label={"Confirm new password"} 
                name={'newPasswordConfirm'} 
                handleChange={handleChange}
                disabled={!isUpdatingPass}
                type={'password'}
            />
        </div>
    )
}
 
export default UpdatePass