const mongoose=require('mongoose')
const ordersSchema=new mongoose.Schema({
    orders:{
        type:[{
            email: {
                type: String,
                required: true,
                unique:true
            },
            address:{
                type:String,
                required:true
            },
            items:{
                type:[
                    {
                        itemName:{
                            type:String,
                            required:true
                        }
                    }
                ]
            },
            mobile:{
                type:String,
                required:true
            },
            date:{
                type:String,
                required:true
            },
            time:{
                type:String,
                required:true,
                unique:true
            }
        }]
    },
},{"strict":"throws"});

const Orders=mongoose.model('order',ordersSchema);
module.exports=Orders;