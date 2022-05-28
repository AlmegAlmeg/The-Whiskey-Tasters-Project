import Joi from 'joi-browser'

export const loginSchema = {
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(16).regex(new RegExp('^[a-zA-Z0-9]{3,16}$')).required()
}

export const signupSchema = {
    userName: Joi.string().min(2).max(12).required(),
    ...loginSchema,
    passwordConfirm: Joi.string().min(3).max(16).regex(new RegExp('^[a-zA-Z0-9]{3,16}$')).required()
}

export const updateSchema = {
    userName: Joi.string().min(2).max(12).required(),
    email: Joi.string().email().required(),
}

export const updateWithPassSchame = {
    ...updateSchema,
    password: Joi.string().min(3).max(16).required(),
    newPassword: Joi.string().min(3).max(16).regex(new RegExp('^[a-zA-Z0-9]{3,16}$')).required(),
    newPasswordConfirm: Joi.string().min(3).max(16).regex(new RegExp('^[a-zA-Z0-9]{3,16}$')).required()
}