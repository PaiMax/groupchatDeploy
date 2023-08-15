const express=require('express');
 
const router=express.Router();

const groupController=require('../controllers/group');
router.post('/post/data',groupController.groupAdd);
router.get('/get/data/:id',groupController.getGroup);


module.exports=router;