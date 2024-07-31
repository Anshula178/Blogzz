//=================REGISTER NEW USER
//POST:api/users/register
const fs = require('fs');
const path = require('path');
const bcrypt=require('bcryptjs')
const User= require("../models/userModel");
const HttpError = require('../models/errorModel.js');
const jwt=require('jsonwebtoken')
const {v4:uuid}=require('uuid')

//UMPROTECTED

const registerUser= async(req,res,next)=>{
    try {
        const {name,email,password,password2}=req.body;
        if(!name||!email||!password){
          return next(new HttpError("Fill in all fields",422))  
        }
        const newEmail=email.toLowerCase()
        const emailExists=  await User.findOne({email:newEmail})
        if(emailExists){
            return next(new HttpError("Email already exits",422))
        }
        if((password.trim()).length<6){
            return next(new HttpError("Password must be at least 6 chaaracters",422))
        }
        if(password != password2){
            return next(new HttpError("Password  do not match",422))   
        }
        const salt= await  bcrypt.genSalt(10);
        const hashedPass=await bcrypt.hash(password,salt)
        const newUser=await User.create({name,email:newEmail, password:hashedPass})
        res.status(201).json(newUser);
    } catch (error) { 
        return next(new HttpError("user registration failed",422))
    }
}
//=================LOGIN  USER
//POST:api/users/login
//UMPROTEC9TED
const loginUser= async(req,res,next)=>{
    const{email,password}=req.body;
    if(!email||!password){
        return next(new HttpError("Please provide email and password",422))
    }
    const user=  await User.findOne({email:email.trim().toLowerCase()})
    if(!user){
        return next(new HttpError("Invalid email or password",401))
    }
    const passwordExists=await bcrypt.compare(password, user.password)
    if(!passwordExists){
        return next(new HttpError("Invalid email or password",401))
    }
    const {_id:id,name}=user;
    const token=jwt.sign({id,name},process.env.JWT_SECRET,{expiresIn:"1d"})
    res.status(200).json({
        message:"user login succesfully",
        token:token,
        name:user.name,
        userId: user.id,
        email: user.email
    })
    

    
    
}
//=================USER PROFILE 
//POST:api/users/:id
//PROTECTED
const getUser=async(req,res,next)=>{
    try {
        const userId=req.params.id;
        console.log('User ID:', userId);
        const user= await User.findById(userId).select('-password')
     if(!user){
        return next(new HttpError("user not found",404));
      }
        res.status(200).json(user);
    } catch (error) {
        return next( new HttpError(error))
    }
    
}
//=================change Avatar PROFILE 
//POST:api/users/change-avatar
//PROTECTED
// const changeAvatar = async (req, res, next) => {
//     try {
//         if (!req.files) {
//             throw new HttpError('No file uploaded', 422);
//         }

//         // Check file size
//         if (req.files.size > 500000) { // 500kb
//             return next(new HttpError("Profile picture is too big. Should be less than 500kb", 422));
//         }

//         // Find user from the database
//         const user = await User.findById(req.user.id);
//         if (!user) {
//             return next(new HttpError("User not found", 404));
//         }

//         // Delete old avatar if it exists
//         if (user.avatar) {
//             const oldAvatarPath = path.join(__dirname, '..', user.avatar);
//             fs.unlink(oldAvatarPath, (err) => {
//                 if (err) {
//                     console.error('Failed to delete old avatar:', err);
//                 } else {
//                     console.log('Old avatar deleted:', oldAvatarPath);
//                 }
//             });
//         }

//         // Update user's avatar field with the new file path
//         user.avatar = `/uploads/${req.files.filename}`;
//         await user.save();

//         res.json({ fileName: req.files.filename, filePath: `/uploads/${req.files.filename}` });
//         console.log(req.file);
//     } catch (error) {
//         next(error);
//     }
// };
const changeAvatar = async (req, res, next) => {
    try {
        if (!req.files || !req.files.avatar) {
            return next(new HttpError("Please choose an image", 422));
        }

        const user = await User.findById(req.user.id);
        if (!user) {
            return next(new HttpError("User not found", 404));
        }

        if (user.avatar) {
            const oldAvatarPath = path.join(__dirname, '..', 'uploads', user.avatar);
            fs.unlink(oldAvatarPath, (err) => {
                if (err) {
                    console.error('Failed to delete old avatar:', err);
                }
            });
        }

        const avatar = req.files.avatar;

        if (avatar.size > 500000) {
            return next(new HttpError("Profile picture should be less than 500kb", 422));
        }

        const fileName = avatar.name;
        const splittedFilename = fileName.split('.');
        const newFilename = `${splittedFilename[0]}-${uuid()}.${splittedFilename[splittedFilename.length - 1]}`;

        avatar.mv(path.join(__dirname, '..', 'uploads', newFilename), async (err) => {
            if (err) {
                return next(new HttpError(err.message, 500));
            }

            user.avatar = newFilename;
            await user.save();

            res.status(200).json({ avatar: newFilename, filePath: `/uploads/${newFilename}` });
        });
    } catch (error) {
        next(error);
    }
};
//================= EDIT USER DETAIL 
//POST:api/users/edit-user
//PROTECTED
const editUser=async(req,res,next)=>{
    try {
        const {name,email,currentPassword,newPassword,confirmNewPassword}=req.body;
        if(!name||!email||!currentPassword||!newPassword){
            return next(new HttpError("Fill in all fields",422))
        }
        //get user from the database
        const user= await User.findById(req.user.id);
        if(!user){
            return next(new HttpError("User not found.",403))
        } 
        //make sure new email doesn't already exist
        const emailExists=await User.findOne({email});
        if(emailExists&&(emailExists._id !=req.user.id)){
          return next(new HttpError("Email already exist.",422))  
        }
        //compare current password to db password
        const validateUserPassword=await bcrypt.compare(currentPassword,user.password)
        if(!validateUserPassword){
            return next(new HttpError(" Invalid current password",422))
        }
        //compare new password
        if(newPassword!==confirmNewPassword){
            return next (new HttpError("New password do not match",422))
        }
        //hash new password
        const salt =await bcrypt.genSalt(10)
        const hash=await bcrypt.hash(newPassword,salt);
        //update
        const newInfo= await User.findByIdAndUpdate(req.user.id,{name,email,password:hash},{new:true})
         res.status(200).json(newInfo)
    } catch (error) {
       return next(new HttpError(error)) 
    }
    
    
}
//================= GET Authors
//POST:api/users/authors
//UNPROTECTED
const getAuthors=async(req,res,next)=>{
    try {
       const authors= await User.find().select('-password') ;
       res.json(authors)
    } catch (error) {
        return next (new HttpError(error))
    }
}
const deleteAuthor=async(req,res,next)=>{
    try {
        const authorId=req.user.id
        const author=await User.findById(authorId);
        if(!author){
            return next(new HttpError("User not found",404))
        }
        await User.findByIdAndDelete(authorId)
        res.status(200).json({ message: 'Account deleted successfully' });
        
    } catch (error) {
        return next(new HttpError(error))
    }
}
module.exports={registerUser,loginUser,getAuthors,getUser,editUser,changeAvatar,deleteAuthor}

