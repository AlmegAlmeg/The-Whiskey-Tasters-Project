require('dotenv').config()
const mongoose = require('mongoose')

const ADMIN_NAME = process.env.ADMIN_NAME
const PASSWORD = process.env.PASSWORD
const DB_NAME = process.env.DB_NAME
const DB_URL = `mongodb+srv://${ADMIN_NAME}:${PASSWORD}@cluster0.jwojk.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to DB'))
    .catch(err => console.log(`Connection to DB failed. ERROR: ${err}`))