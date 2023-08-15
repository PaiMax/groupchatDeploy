
const User=require('../models/user');
const Group=require('../models/group');
const userGroup=require('../models/userGroup');


exports.groupAdd= async (req,res,next)=>{try{let i=0;
    

    console.log('in grop......................');
    const gname=req.body.groupName;
    const options=req.body.users;
    const userData=await User.findAll();
    console.log(userData);
    const userIddata=userData.map((user)=>{
        
        if(i<options.length && user.dataValues.name===options[i]){
            i++;
            return user.dataValues.id;
        }
    })
    console.log(userIddata);
     const group=await Group.create({
        name:gname,
        members:options.length

     });

     for(const id of userIddata){
        try{
           await userGroup.create({
                userId:id,
                groupId:group.dataValues.id
            })

        }
        catch(err){
            console.log(err);
        }
        
        
        
     }
     res.send({message:'sucess',groupdata:group});}
     catch(err){
        console.log(err);
        res.send({message:'failure'});
     }
    






    

    
}
exports.getGroup= async (req,res,next)=>{
    try{
        const id=req.params.id;
        console.log('id======'+id);
        const group= await Group.findOne({where:{id:id}});
        console.log(group);
        res.send({data:group});


    }
    catch(err){
        console.log(err);
    }
    



}
