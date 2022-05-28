const multer = require('multer')

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true)
    }
    cb(null, false)
}

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, '../client/public/assets/uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({ 
    storage,
    limits: {
        fileSize: 1024 * 1024 * 2
    },
    fileFilter
})

module.exports = upload