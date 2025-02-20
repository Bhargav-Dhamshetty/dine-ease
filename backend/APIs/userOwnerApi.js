const exp=require('express')
const expressAsyncHandler=require('express-async-handler')
const User=require('../models/userAdminModel')
const userApp=exp.Router()


userApp.post('/register',expressAsyncHandler(async(req,res)=>{
    const newUserOwner=req.body;
    const {email}=req.params.email;
    const userInDb=await User.findOne({email:email})
    if(userInDb!==null){
        if(newUserOwner.role===userInDb.role){
            res.status(200).send({message:newUserOwner.role,payload:userInDb})
        }else{
            res.status(200).send({message:"Invalid role"})
        }
    }else{
        let newUser=new User(newUserOwner);
        let newUserOrOwnerDoc = await newUser.save();
        res.status(201).send({message:newUserOwner.role,payload:newUserOrOwnerDoc})
    }
}))

userApp.put('/users/:email', expressAsyncHandler(async (req, res) => {
    try {
        console.log("Received Data:", req.body); // Debugging log
        const changeDet = req.body;

        // Prevent email update
        delete changeDet.email;

        const updatedUser = await UserOwner.findOneAndUpdate(
            { email: req.params.email },
            { ...changeDet },
            { returnOriginal:false }
        );
        res.status(200).send({message:"User Updated",payload:updatedUser})

    } catch (error) {
        res.status(500).send({ message: "Server Error", error: error.message });
    }
}));

// Get all users
userApp.get('/users', expressAsyncHandler(async (req, res) => {
    try {
        const users = await UserOwner.find();
        res.status(200).send({ message: "Users Fetched", payload: users });
    } catch (error) {
        res.status(500).send({ message: "Server Error", error: error.message });
    }
}));



module.exports=userApp;