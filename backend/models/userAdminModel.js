const mongoose=require('mongoose')
const userOwnerSchema=new mongoose.Schema({
    role: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    profileImageUrl: {
        type: String,

    },
    address:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    }
},{"strict":"throw"})

const UserOwner=mongoose.model('user',userOwnerSchema)
module.exports=UserOwner;