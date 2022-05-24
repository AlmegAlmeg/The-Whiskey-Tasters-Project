import { useState } from "react"
import Joi from 'joi-browser'

export const useValidation = (value, schema) => {
    const [errors, setErrors] = useState({})
    const [data] = useState({ ...value })

    const handleChange = ({target: {name, value, checked, type}}) => {
        const errorData = { ...errors }
        const errorMessage = validateProperty(name, value)
        if(errorMessage) errorData[name] = errorMessage
        else delete errorData[name]
        data[name] = value
        setErrors(errorData)
    }

    const validateProperty = (name, value) => {
        const obj = { [name]:value }
        const { error } = Joi.validate(obj, {[name]: schema[name]})
        if(error){
            const customError = createCustomError(error.details[0].type, name)
            return customError
        }
        return null
    }

    const validate = (data) => {
        const { error } = Joi.validate(data, schema, { abortEarly: false })
        return error
    }
    
    return {data, errors, handleChange, validate}
}

const createCustomError = (type) => {
    switch (type){
        case 'any.empty':
            return 'This field is required'
        case 'string.min':
            return 'This field must contain at least 2 characters'
        case 'string.email':
            return 'Please provide a valid email'
        case 'string.max':
            return 'This field cannot contain more then 16 characters'
        default: 
            return ''
    }
}