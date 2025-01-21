const express = require('express')
const cors = require('cors')
const { ConnectDB } = require('./configs/db.js')
const foodRouter = require('./routes/foodRouter.js')
const userRouter = require('./routes/userRouter.js')
const cartRouter = require('./routes/cartRouter.js')
const orderRouter = require('./routes/orderRouter.js')

require('dotenv').config()

// app configs
const app = express()

//middleware
app.use(express.json())
app.use(cors())

ConnectDB();

app.use('/api/food', foodRouter)
app.use('/images', express.static('uploads'))
app.use('/api/user', userRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)



app.get('/', (req, res) => {
    res.send("Hello there")
})

app.listen(process.env.PORT, () => {
    console.log('Listening on port ',process.env.PORT)
})



