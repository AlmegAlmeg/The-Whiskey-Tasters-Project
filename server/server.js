require("dotenv").config()

const express = require("express")
const app = express()
const cors = require("cors")
const morgan = require("morgan")
require("./config/dbConnection")

const usersRouter = require("./routes/users/users")
const reviewsRouter = require("./routes/reviews/reviews")
const reviewersRouter = require("./routes/reviews/reviewers")
const adminsRouter = require("./routes/admins/admins")

const userAuth = require("./middlewares/usersMiddleware")
const reviewerAuth = require("./middlewares/reviewersMiddleware")
const adminAuth = require("./middlewares/adminsMiddleware")

app.use(cors())
app.use(express.json())
app.use(morgan(":method :url :status :response-time ms"))

const PORT = process.env.SERVER_PORT || 8000
app.listen(process.env.SERVER_PORT, () =>
  console.log(`Server is running on port ${PORT}`)
)

app.use("/users", usersRouter)
app.use("/reviews", reviewsRouter)
app.use("/reviewers", userAuth, reviewerAuth, reviewersRouter)
app.use("/admins", userAuth, adminAuth, adminsRouter)

module.exports = app
