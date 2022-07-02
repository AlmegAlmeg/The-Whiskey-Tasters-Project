const express = require("express")
const router = express.Router()

const { v4: uuid4 } = require("uuid")
const { User, findByUniqeId } = require("../../model/users")
const { Review, findReviewById } = require("../../model/reviews")
const { reviewSchema } = require("../../validation/reviews")

const options = { abortEarly: false }

//? Create new review
router.post("/new", async (req, res) => {
  try {
    let { title, subtitle, description, rating, imageUrl } =
      await reviewSchema.validateAsync(req.body, options)
    if (!subtitle) subtitle = ""

    const reviewId = uuid4()
    const review = new Review({
      reviewId,
      title,
      subtitle,
      description,
      rating,
      imageUrl,
      creator: req.token.uniqeId,
    })
    await review.save()

    res.send("A new review has been created!")
  } catch (err) {
    res.status(400).send(err)
  }
})

//? Update a review
router.patch('/:id', async (req,res) => {
  try {
    let { title, subtitle, description, rating, imageUrl } = await reviewSchema.validateAsync(req.body, options)

    if (!subtitle) subtitle = ""

    const { id } = req.params
    const [currentReview] = await findReviewById(id)

    await Review.findByIdAndUpdate(currentReview.id, { title, subtitle, description, rating, imageUrl })

    res.send('Review updated!')
  } catch (err) {
    console.log(err)
  }

})

//? Delete a review
router.delete('/:id', async (req,res) => {
  try {
    const { id } = req.params
    const [review] = await findReviewById(id)
    await Review.findByIdAndDelete(review.id)
    res.send('Review deleted!')
  } catch (err) {
    res.send(err)
  }

})
module.exports = router
