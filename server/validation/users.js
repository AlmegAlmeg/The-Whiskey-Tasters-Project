const Joi = require('joi')

const signupSchema = Joi.object({
    userName: Joi.string().min(2).max(16).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com","net"] } }).required(),
    password: Joi.string().min(3).max(16).pattern(new RegExp('^[a-zA-Z0-9]{3,16}$')).required()
})

const loginSchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com","net"] } }).required(),
    password: Joi.string().min(3).max(16).pattern(new RegExp('^[a-zA-Z0-9]{3,16}$')).required()
})

const updateSchema = Joi.object({
    userName: Joi.string().min(2).max(16).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com","net"] } }).required(),
    password: Joi.string().min(3).max(16).pattern(new RegExp('^[a-zA-Z0-9]{3,16}$')),
    newPassword: Joi.string().min(3).max(16).pattern(new RegExp('^[a-zA-Z0-9]{3,16}$')),
    image: Joi.any()
})

module.exports = {
    signupSchema,
    loginSchema,
    updateSchema
}