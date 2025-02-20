const exp=require('express')
const app=exp()
require('dotenv').config()
const mongoose=require('mongoose')
const userApp=require('./APIs/userOwnerApi')
const orderApp=require('./APIs/orderApi')
const restaurentApp=require('./APIs/restaurentApi')
const cors = require('cors');
const PORT=process.env.PORT || 8000
mongoose.connect(process.env.DBURL)
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`server is listening on port: ${PORT}`)
        console.log('DB connection success')
    })
})
.catch(err=> console.log('DB connection is failed',err))

//body parser
app.use(exp.json())
app.use(cors())
app.use(exp.urlencoded({ extended: true }))
//connect APIs
app.use('/user-api',userApp)
app.use('/restaurent-api',restaurentApp)
app.use('/order-api',orderApp)
