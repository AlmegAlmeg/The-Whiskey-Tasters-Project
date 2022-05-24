const jwt = require('../config/jwt')

module.exports = async (req,res,next)=>{
    try{
        req.token = await jwt.verifyToken(req.headers['auth-token'])
        if(!req.token) throw 'You must be logged in to do this action' 
        const { isBanned } = req.token
        if(isBanned) throw "You are banned from our system"
        next()
    }catch(err){
        res.status(403).send(err)
    }
}