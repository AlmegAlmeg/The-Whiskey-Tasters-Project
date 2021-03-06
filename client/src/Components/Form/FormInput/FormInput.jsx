import './FormInput.scss'

const FormInput = ({ name, errors, label, handleChange, type='text', defaultValue = '', disabled = false ,required = true }) => {
    return (
        <div className='form-input'>
            <label htmlFor={name}>
                {required && <span className='field-required'>*</span>}
                {label}
            </label>
            <input 
                defaultValue={defaultValue}
                type={type}
                name={name}
                id={name}
                disabled={disabled}
                onChange={(e)=> handleChange(e)}
            />
            {errors[name] && <div className='input-error'>{errors[name]}</div>}
        </div>
    )
}
 
export default FormInput;