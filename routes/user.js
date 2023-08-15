const express=require('express');
 
const router=express.Router();

const userController=require('../controllers/user');
const Authorization=require('../middleware/auth');



router.post('/login',userController.checkUser)



router.post('/signup',userController.addUser);
router.post('/message',Authorization.authentication,userController.messageStore);
router.get('/get/messages/:gid',userController.getMessages);
router.get('/get/userData/:id',userController.getUser);
router.get('/get/name',userController.getUserName);
router.get('/search/:name',userController.searchUser);




module.exports=router;