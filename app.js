const express =require('express');
const bodyParser=require('body-parser');
const sequelize =require('./util/database');
const user=require('./models/user');
const group=require('./models/group');
const userGroup=require('./models/userGroup');
const userAdmins=require('./models/groupAdmin');
const message=require('./models/message');
const app=express();
const userRoutes=require('./routes/user');
const cors=require('cors');
const groupRoutes=require('./routes/group');
const userGroupesRoutes=require('./routes/usergroup');
const adminRoutes=require('./routes/admin');
const path = require('path');


app.use(cors({origin:"*"}));
console.log('hello');
app.use(bodyParser.json({extended:false}));




app.use('/user',userRoutes);
app.use('/group',groupRoutes);
app.use('/usergroups',userGroupesRoutes);
app.use('/admin',adminRoutes);
app.use((req,res)=>{
    res.sendFile(path.join(__dirname,`public/${req.url}`));
})

user.hasMany(message,{constraints:true,onDelete:'CASCADE'});
message.belongsTo(user);

group.hasMany(message,{constraints:true,onDelete:'CASCADE'});
message.belongsTo(group);





user.belongsToMany(group,{through:userGroup,constraints:true,onDelete:'CASCADE'});
group.belongsToMany(user,{through:userGroup,constraints:true,onDelete:'CASCADE'});



user.belongsToMany(group,{through:userAdmins,constraints:true,onDelete:'CASCADE'});
group.belongsToMany(user,{through:userAdmins,constraints:true,onDelete:'CASCADE'});




sequelize
.sync()
.then(result=>{console.log(result); app.listen(2000);})
.catch(err=> console.log(err));
