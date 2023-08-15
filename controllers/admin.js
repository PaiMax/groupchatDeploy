const Admin=require('../models/groupAdmin');


exports.addAdmin=async(req,res,next)=>{
    try{
        console.log('user iD==================='+req.user.id);
        await Admin.create({
            userId:req.user.id,
            groupId:req.params.gid
        })
        res.send({message:'sucess'});

    }
    catch(err){
        console.log(err);

    }
    

}

exports.makeAdmin=async (req,res,next)=>{
    try{
        await Admin.create({
            userId:req.body.userId,
            groupId:req.body.groupId
        })
        res.send({message:'sucess'});

    }
    catch(err){
        console.log(err);

    }

}
