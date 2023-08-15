const userGroup=require('../models/userGroup');
const User=require('../models/user');
const Group=require('../models/group');




exports.getUserGroups=async (req,res,next)=>{
    try{ console.log('in getusergroup:::::::');
    console.log(req.user.id);
        const usergroups=await userGroup.findAll({where:{userId:req.user.id}});
        
        console.log(usergroups);
        res.send(usergroups);
        
    }
    catch(err){
        console.log(err);

    }
}


exports.addUserGroup = async (req,res,next)=>{
    try{ 
        console.log('in addusergroups')
        await userGroup.create({userId:req.body.userId,groupId:req.body.groupId});
    res.send({message:'sucess'});
}
    catch(err){
        console.log(err);
    }
   
}


exports.getUserData=async (req,res,next)=>{
    try{

        const grId=req.params.gid;
        const users=await userGroup.findAll({where:{groupId:grId}});
        res.send(users);
    }
    
    catch(err){
        console.log(err);
    

    }

}

exports.deleteUserData=async (req,res,next)=>{
    try{
        const userID=req.params.userid;
    await userGroup.destroy({where:{userId:userID}});
    res.send({message:'success'});

    }
    catch(err){
        console.log(err);
    }
    
}

