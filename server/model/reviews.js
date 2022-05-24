const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    writerId: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    writerName: {
        type: String,
        required: true
    },
    commentBody: {
        type: String,
        required: true,
        minlength: 1
    },
    timeWritten: {
        type: Date,
        default: Date.now
    }
})

const schema = new mongoose.Schema({
    reviewId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        minlength: 3,
    },
    subtitle: String,
    description: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 10
    },
    creator: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    likes: [String],
    comments: [commentSchema]
})

const Review = mongoose.model('reviews', schema)

const findReviewById = (reviewId) => {
    return Review.find({ reviewId })
}

module.exports = {
    Review,
    findReviewById
}