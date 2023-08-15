document.addEventListener('submit',loginUser);
const email=document.getElementById('email');
const password=document.getElementById('password');
function loginUser(event){
    
    event.preventDefault();
    axios.post('http://3.88.226.21:2000/user/login',{email:email.value,password:password.value})
    .then((res)=>{
        console.log('in event');
        const para=document.getElementById('para');
        console.log(res.data.message);
        para.innerText=res.data.message;
        if(res.data.message!="Password does'nt match"&& res.data.message!="User does'nt exist"){

            localStorage.setItem('name',res.data.name);
            localStorage.setItem('token',res.data.token);
            
            
            window.location.href='../chat.html';


        }
        
    })
    .catch(err=>console.log(err));


}
document.getElementById('signup').addEventListener('click',sign);
function sign(){
    window.location.href='../signup/signup.html';

}