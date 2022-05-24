const express = require('express')
const router = express.Router()

const { schema } = require('../../validation/admins')
const { User, findByUniqeId } = require('../../model/users')

const options = { abortEarly: false }

//? Warn a user
router.patch('/warn/:id', async (req,res) => {
    try {
        const { reason } = await schema.validateAsync(req.body)
        const [{ id, warnings, userName, adminLevel, isBanned }] = await findByUniqeId(req.params.id)
        if(!id) throw 'Wrong user id'

        if(isBanned) throw 'You cannot warn a banned user...'

        const { userName: admin, adminLevel: level } = req.token
        if(level <= adminLevel) throw 'You cannot warn admin with same level as you or higher'


        if(warnings.length < 2){
            await User.findByIdAndUpdate(id, { warnings: [...warnings, `${admin}: ${reason}`] })
            res.send(`${userName} was warned by ${admin} for "${reason}"`)
        } else {
            await User.findByIdAndUpdate(id, { 
                warnings: [...warnings, `${admin}: ${reason}`], 
                isBanned: true, 
                bannedReason: 'Three warnings', 
                adminLevel: 0 
            })
            res.send(`Three warnings are more than enought, ${userName} is now banned by ${admin}`)
        }
    } catch (err) {
        res.status(400).send(err)
    }
})


//? Ban a user
router.patch('/ban/:id', async (req,res) => {
    try {
        const { reason } = await schema.validateAsync(req.body)
        const [{ id, userName, adminLevel }] = await findByUniqeId(req.params.id)
        if(!id) throw 'Wrong user id'

        if(isBanned) throw 'This user is already banned'

        const { userName: admin, adminLevel: level } = req.token
        if(level != 3 && adminLevel != 0) throw 'Only owners can ban admins...'

        
        await User.findByIdAndUpdate(id, { 
            bannedReason: `Admin ${admin}: ${reason}`, 
            isBanned: true, 
            adminLevel: 0 
        })
        res.send(`${userName} is now banned by ${admin}. Reason: ${reason}`)
    } catch (err) {
        res.status(400).send(err)
    }
})

module.exports = router