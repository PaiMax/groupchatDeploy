const Sequelize=require('sequelize');
const sequelize=require('../util/database');
const Admin =sequelize.define('admins',{});
module.exports=Admin;