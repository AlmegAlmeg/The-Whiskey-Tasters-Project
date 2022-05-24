const Joi = require('joi')

const reviewSchema = Joi.object({
    title: Joi.string().min(3).required(),
    subtitle: Joi.string(),
    description: Joi.string().required(),
    rating: Joi.number().min(1).max(10).required()
})

const commentSchema = Joi.object({
    commentBody: Joi.string().min(1).required()
})

module.exports = {
    reviewSchema,
    commentSchema
}