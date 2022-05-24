const jwt = require('../config/jwt')

module.exports = async (req,res,next)=>{
    try{
        const { adminLevel } = req.token
        if(adminLevel === 0) throw 'Only admins can do that action'
        next()
    }catch(err){
        res.status(403).send(err)
    }
}