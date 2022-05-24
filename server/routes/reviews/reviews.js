const express = require('express')
const router = express.Router()

const { User, findByUniqeId } = require('../../model/users')
const { Review, findReviewById } = require('../../model/reviews')
const { commentSchema } = require('../../validation/reviews')
const userAuth = require('../../middlewares/usersMiddleware')

const options = { abortEarly: false }

//? Like and dislike a review
router.patch('/like/:id', userAuth, async (req,res) => {
    try {
        let [{ id, likes }] = await findReviewById(req.params.id)
        const { uniqeId, userName } = req.token
        const index = likes.findIndex((item) => item == uniqeId)
        if(index >= 0){
            likes = likes.filter((item) => item != uniqeId)
            await Review.findByIdAndUpdate(id, { likes })
            res.send(`${userName} removed his like from that review!`)
        } else {
            await Review.findByIdAndUpdate(id, { likes: [...likes, uniqeId] })
            res.send(`${userName} liked that review!`)
        }
    } catch (err) {
        res.status(400).send(err)
    }
})


//? Add a comment
router.post('/comment/:id', async (req,res) => {
    try {
        const { commentBody } = await commentSchema.validateAsync(req.body, options)
        const { uniqeId: writerId, userName: writerName } = req.token
        const [{ id, comments }] = await findReviewById(req.params.id)

        await Review.findByIdAndUpdate(id, { comments: [...comments, { writerId, writerName, commentBody }] })

        res.send(`${writerName} just comment!`)
    } catch (err) {
        console.log(err)
        res.status(400).send(err)
    }
})

module.exports = router