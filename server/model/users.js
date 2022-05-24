const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    uniqeId: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 16
    },
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
    },
    profileImage: String,
    adminLevel: {
        type: Number,
        default: 0,
        min: 0,
        max: 3
    },
    reviewer: {
        type: Boolean,
        required: true,
        default: false
    },
    isBanned: {
        type: Boolean,
        default: false
    },
    bannedReason: String,
    warnings: [String]
})

const User = mongoose.model('users', schema)

const findByUniqeId = (uniqeId) => {
    return User.find({ uniqeId })
}

module.exports = {
    User,
    findByUniqeId
}