const express = require('express')
const router = express.Router()

const { v4: uuid4 } = require('uuid')
const upload = require('../../config/multer')

const userAuth = require('../../middlewares/usersMiddleware')
const { User, findByUniqeId } = require('../../model/users')
const { createHash, compareHash } = require('../../config/bcrypt')
const { signupSchema, loginSchema, updateSchema } = require('../../validation/users')
const { createToken } = require('../../config/jwt')

const options = { abortEarly: false }

//! https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png


//? Signup to system
router.post('/signup', async (req,res) => {
    try {
        let { userName, email, password } = await signupSchema.validateAsync(req.body, options)

        let usersArr = await User.find({ userName: userName })
        if(usersArr.length != 0) throw 'This username is already taken'
        usersArr = await User.find({ email: email })
        if(usersArr.length != 0) throw 'This email is already exists'

        password = await createHash(password)
        const uniqeId = uuid4()
        
        const user = new User({ uniqeId, userName, email, password })
        await user.save()
        res.send('New user has been signed up!')
    } catch (err) {
        res.status(400).send(err)
    }
})


//? Login to system
router.post('/login', async (req,res) => {
    try {
        let { email, password } = await loginSchema.validateAsync(req.body, options)

        let [currentUser] = await User.find({ email: email })
        if(!currentUser) throw 'This email isn\'t registered'
        const checkPass = await compareHash(password, currentUser.password)
        if(!checkPass) throw 'Wrong password'

        const { uniqeId, userName, reviewer, adminLevel, isBanned, profileImage } = currentUser
        if(isBanned) throw 'You are banned from our system'
        
        const token = await createToken({ uniqeId, userName, reviewer, adminLevel, isBanned, profileImage })
        res.send(token)
    } catch (err) {
        console.log(err)
        res.status(400).send(err)
    }
})


//TODO Get all info about me -> // CHANGE
router.get('/me', userAuth, async (req,res) => {
    try {
        const [currentUser] = await findByUniqeId(req.token.uniqeId)
        res.send(currentUser)
    } catch (err) {
        res.status(400).send(err)
    }
})

//? Update basic details 
router.put('/me/update', userAuth, async (req,res) => {
    try {
        let { userName, email, password, newPassword } = await updateSchema.validateAsync(req.body ,options)
        const [currentUser] = await findByUniqeId(req.token.uniqeId)
        
        
        if(userName != currentUser.userName) {
            let usersArr = await User.find({ userName: userName })
            if(usersArr.length != 0) throw 'This username is already taken'
        }
        
        if(email != currentUser.email){
            let usersArr = await User.find({ email: email })
            if(usersArr.length != 0) throw 'This email is already exists'
        }
        
        if(newPassword){
            const checkPass = await compareHash(password, currentUser.password)
            if(!checkPass) throw 'Wrong password'
            if(password && password == newPassword) throw 'Your new password cannot be similar to your current password'
            newPassword = await createHash(newPassword)
        }
        await User.findByIdAndUpdate(currentUser.id, { userName, email, password: newPassword })
        const token = await createToken({
            uniqeId: currentUser.uniqeId,
            userName,
            reviewer: currentUser.reviewer,
            adminLevel: currentUser.adminLevel,
            isBanned: currentUser.isBanned,
            profileImage: currentUser.profileImage
        })
        res.send(token)
    } catch (err) {
        res.status(400).send(err)
    }
})

router.patch('/me/profile-photo', userAuth, upload.single('profile'), async (req,res) => {
    try {
        let { filename } = req.file
        const [{ id }] = await findByUniqeId(req.token.uniqeId)
        const { profileImage } = await User.findByIdAndUpdate(id, { profileImage: filename })
        res.send(profileImage)
    } catch (err) {
        res.status(400).send(err)
    }
})

module.exports = router