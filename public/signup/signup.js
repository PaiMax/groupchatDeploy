document.getElementById('btn').addEventListener('click',addUser);
const name=document.getElementById('name');
const email=document.getElementById('email');
const password=document.getElementById('password');
const phone =document.getElementById('phone');


function addUser(event){
    event.preventDefault();
   axios.post('http://3.88.226.21:2000/user/signup',{name:name.value,email:email.value,password:password.value,phone:phone.value})
   .then((res)=>{
      const para=document.getElementById('para');
      
      
      
      
      
      
      para.innerText=res.data.message;

   })
   .catch(err=>{
      const para=document.getElementById('para');
      if(err.response.data.name==='SequelizeUniqueConstraintError'){
         para.innerText='User already exist';
      

      }
      console.log(err.response)});}