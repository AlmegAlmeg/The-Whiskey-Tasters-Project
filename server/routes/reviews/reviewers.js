const express = require('express')
const router = express.Router()

const { v4: uuid4 } = require('uuid')
const { User, findByUniqeId } = require('../../model/users')
const { Review } = require('../../model/reviews')
const { reviewSchema } = require('../../validation/reviews')

const options = { abortEarly: false }


//? Create new review
router.post('/new', async (req,res) => {
    try {
        let { title, subtitle, description, rating } = await reviewSchema.validateAsync(req.body, options)
        if(!subtitle) subtitle = ''
        
        const reviewId = uuid4()
        const review = new Review({ reviewId, title, subtitle, description, rating, creator: req.token.uniqeId })
        await review.save()

        res.send('A new review has been created!')
    } catch (err) {
        res.status(400).send(err)
    }
})


module.exports = router