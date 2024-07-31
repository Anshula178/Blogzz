const Post = require("../models/postModel");
const User = require("../models/userModel");
const path = require('path');
const fs = require('fs');
const { v4: uuid } = require('uuid');
const HttpError = require('../models/errorModel');
const { equal } = require("assert");
const mongoose = require('mongoose');

// Controller functions
const createPost = async (req, res, next) => {
    try {
        console.log('Request Body:', req.body);
        console.log('Request Files:', req.files);
        let { title, category, description } = req.body;
        if (!title || !category || !description || !req.files ) {
            return next(new HttpError("Fill in all fields and choose thumbnail", 422));
        }

        const { thumbnail } = req.files;
        if (thumbnail.size > 2000000) {
            return next(new HttpError("Thumbnail too big. File should be less than 2MB.", 422));
        }

        let fileName = thumbnail.name;
        let splittedFilename = fileName.split('.');
        let newFilename = splittedFilename[0] + uuid() + "." + splittedFilename[splittedFilename.length - 1];

        thumbnail.mv(path.join(__dirname, "..", "uploads", newFilename), async (err) => {
            if (err) {
                return next(new HttpError(err));
            } else {
                const newPost = await Post.create({ title, category, description, thumbnail: newFilename, creator: req.user.id });
                if (!newPost) {
                    return next(new HttpError("Post couldn't be created.", 422));
                }

                // find user and increase post count by 1
                const currentUser = await User.findById(req.user.id);
                currentUser.posts = currentUser.posts + 1;
                await currentUser.save();

                res.status(201).json(newPost);
            }
        });
    } catch (error) {
        return next(new HttpError(error));
    }
};

const getPosts = async (req, res, next) => {
   try {
     const posts=await Post.find().sort({updateAt:-1})
     res.status(200).json(posts)
   } catch (error) {
    return next (new HttpError(error))
   }
};

const getPost = async (req, res, next) => {
   try {
     const postId=req.params.id;
     const post =await Post.findById(postId);
     if(!post){
       return next(new HttpError("Post not Found",404)) 
     }
     res.status(200).json(post)
   } catch (error) {
    return next(new HttpError(error)) 
   }
};

const getCatPosts = async (req, res, next) => {
   try {
    const {category}=req.params;
    const catPosts=await Post.find({category}).sort({createAt:-1})
    res.status(200).json(catPosts)
   } catch (error) {
    return next(new HttpError(error)) 
   }
};

const getUserPost = async (req, res, next) => {
   try {
     const {id}=req.params;
     const posts=await  Post.find({creator:id}).sort({createdAt:-1})
     res.status(200).json(posts )
   } catch (error) {
    return next(new HttpError(error)) 
   }
};



const editPost = async (req, res, next) => {
    try {
        const postId = req.params.id;
        const { title, category, description } = req.body;

        if (!title || !category || typeof description !== 'string' || description.length < 12) {
            return next(new HttpError("Fill in all fields with valid data", 422));
        }

        const objectId = new mongoose.Types.ObjectId(postId);
        const oldPost = await Post.findById(objectId);
        if (!oldPost) {
            return next(new HttpError("Post not found", 404));
        }

        if (req.user.id !== oldPost.creator.toString()) {
            return next(new HttpError("Not authorized", 403));
        }

        let updateData = { title, category, description };

        if (req.files && req.files.thumbnail) {
            const { thumbnail } = req.files;

            if (thumbnail.size > 2000000) {
                return next(new HttpError("Thumbnail too big. Should be less than 2MB.", 422));
            }

            if (!['image/jpeg', 'image/png', 'image/jpg'].includes(thumbnail.mimetype)) {
                return next(new HttpError("Invalid file type. Only JPEG and PNG are allowed.", 422));
            }

            try {
                const oldThumbnailPath = path.join(__dirname, "..", "uploads", oldPost.thumbnail);
                if (fs.existsSync(oldThumbnailPath)) {
                    await fs.promises.unlink(oldThumbnailPath);
                }
            } catch (err) {
                console.error("Error deleting old image:", err);
                return next(new HttpError("Error deleting old image", 500));
            }

            const fileName = thumbnail.name;
            const splittedFilename = fileName.split(".");
            const newFilename = `${splittedFilename[0]}-${uuid()}.${splittedFilename[splittedFilename.length - 1]}`;

            try {
                await thumbnail.mv(path.join(__dirname, "..", "uploads", newFilename));
                updateData.thumbnail = newFilename;
            } catch (err) {
                console.error("Error uploading new image:", err);
                return next(new HttpError("Error uploading new image", 500));
            }
        }

        const updatedPost = await Post.findByIdAndUpdate(objectId, updateData, { new: true });
        if (!updatedPost) {
            return next(new HttpError("Couldn't update post", 400));
        }

        res.status(200).json(updatedPost);
    } catch (error) {
        console.error("Error in editPost:", error);
        return next(new HttpError("Internal server error", 500));
    }
};





 
const deletePost = async (req, res, next) => {
   try {
    const postId=req.params.id;
    if(!postId){
        return next(new HttpError("Post Unavailable",400));
    }
    const  post=await Post.findById(postId);
    const fileName= post?.thumbnail;
    //delete thumbnail
    fs.unlink(path.join(__dirname,"..","uploads",fileName),async (err)=>{
        if(err){
            return next(new HttpError(err));
        }
        else{
            await Post.findByIdAndDelete(postId);
            //dind user and  reduce post count by 1
            const currentUser=await User.findById(req.user.id)
            const userPostCount=currentUser?.posts-1;
            await User.findByIdAndUpdate(req.user.id,{posts:userPostCount})
        }
        
    })
    res.json(`Post ${postId} deleted successfully.`)
   } catch (error) {
    return next(new HttpError(error));
   }
};

module.exports = {
    createPost,
    getPosts,
    getPost,
    getCatPosts,
    getUserPost,
    editPost,
    deletePost
};
