const jwt = require('../config/jwt')

module.exports = async (req,res,next)=>{
    try{
        const { reviewer, adminLevel } = req.token
        if(!reviewer && adminLevel == 0) throw 'Only reviewers and admins can do this action'
        next()
    }catch(err){
        res.status(403).send(err)
    }
}