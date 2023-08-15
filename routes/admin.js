const express=require('express');
 
const router=express.Router();

const adminController=require('../controllers/admin');
const Authorization=require('../middleware/auth');

router.get('/post/data/:gid',Authorization.authentication,adminController.addAdmin);
router.post('/makeadmin',adminController.makeAdmin);



module.exports=router;