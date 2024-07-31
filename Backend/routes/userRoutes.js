const { Router } = require('express');
 // Add express-fileupload
const middlewareAuth = require("../middleware/middlewareAuth");  

const { 
    registerUser, 
    loginUser, 
    getAuthors, 
    getUser, 
    editUser, 
    changeAvatar, 
    deleteAuthor
} = require('../controllers/userController');

const router = Router();



// Routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/:id', getUser);
router.get('/', getAuthors);
router.patch('/edit-user', middlewareAuth, editUser);
router.post('/change-avatar', middlewareAuth, changeAvatar);
router.delete('/delete-account',middlewareAuth,deleteAuthor)

module.exports = router;
