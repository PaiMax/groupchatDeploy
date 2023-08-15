const Sequelize=require('sequelize');
const sequelize=require('../util/database');
const userGroup =sequelize.define('usergroups',{});
module.exports=userGroup;