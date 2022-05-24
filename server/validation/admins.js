const Joi = require('joi')

const schema = Joi.object({
    reason: Joi.string().min(2).required()
})

module.exports = {
    schema
}