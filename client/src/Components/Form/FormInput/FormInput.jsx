import './FormInput.scss'

const FormInput = ({ name, errors, label, handleChange, type='text', defaultValue = '' }) => {
    return (
        <div className='form-input'>
            <label htmlFor={name}>
                <span className='field-required'>*</span>
                {label}
            </label>
            <input 
                defaultValue={defaultValue}
                type={type}
                name={name}
                id={name}
                onChange={(e)=> handleChange(e)}
            />
            {errors[name] && <div className='input-error'>{errors[name]}</div>}
        </div>
    )
}
 
export default FormInput;