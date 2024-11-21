const express = require('express')
// const cors = require('cors')

const app = express()

// var coOptions = {
//     origin: 'http://localhost: 8081'
// }

// middleware

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// routers
const router = require('./routes/productRouter.js')
app.use('/api/products', router)

//static image folder
app.use('/Images', express.static('./Images'))

//port
const PORT = process.env.PORT || 8080

//server
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})