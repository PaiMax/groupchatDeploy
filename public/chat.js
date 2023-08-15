let selectedOptions=[]; 
const token =localStorage.getItem('token');
document.addEventListener('DOMContentLoaded',async ()=>{
    try{
        //const curreng=localStorage.getItem('currentGroup');
        //showGroup(curreng);
        
        const token =localStorage.getItem('token');


         const usergropus=await axios.get('http://35.153.200.187:2000/usergroups/getdata',{headers:{"Authorization":token}});
         console.log("usergroups" +usergropus);
         for(const value of usergropus.data){
            const groups=await axios.get(`http://35.153.200.187:2000/group/get/data/${value.groupId}`);
            console.log('group data'+groups.data.data);
            showgroupbutton(groups.data.data);


         }


         await axios.get('')


        
         














       




       

             



        
       

        
        

    }
    catch(err){
        console.log(err);
    }
})





document.getElementById('send').addEventListener('click',sendMessage);
async function sendMessage(){
    try{

        const message=document.getElementById('text').value;
        
        let currentgroup=localStorage.getItem('currentGroup');
        const response=await axios.post('http://35.153.200.187:2000/user/message',{message:message,group:currentgroup},{headers:{"Authorization":token}})
        const room=document.getElementById('room');
        const name=localStorage.getItem('name');
        if(response.data.message==='sucesss'){
            //localStorage.setItem('message',message);
            const child=`<p>${name}: ${message}</p>`;
            room.innerHTML+=child;

        }
        




    }
    catch(err){
        console.log(err);
    }
    
}
const openButton = document.getElementById('group');
const closeButton = document.getElementById('closeButton');
const overlay = document.getElementById('overlay');
const options=document.getElementById('mySelect');

openButton.addEventListener('click',async () => {
    const users=await axios.get('http://35.153.200.187:2000/user/get/name');
    console.log()
    for(const user of users.data.data){
       try{
        const child=`<option value=${user.name}>${user.name}</option>`;
        options.innerHTML+=child;


       }
       catch(err){
           console.log(err);
       }
    }
    overlay.style.display = 'block';
});

closeButton.addEventListener('click', () => {
    overlay.style.display = 'none';
});












document.getElementById('mySelect').addEventListener('change',(event)=>{ 
    
    selectedOptions = Array.from(event.target.selectedOptions).map(option => option.value);
    console.log('Selected options:', selectedOptions);
});



async function showGroup(id){
    try{
    const maindiv=document.getElementById('windowdiv');
    const membersdiv=document.getElementById('members');
    localStorage.removeItem('messages');
    localStorage.setItem('currentGroup',id);


    const chatWindow=document.getElementById('room');
    chatWindow.innerText=localStorage.getItem('name');
    chatWindow.innerText+=' joined';
    let messageId;
    let messagesLocal;
    console.log("mesaagges= "+typeof(localStorage.getItem('messages')));
    if(localStorage.getItem('messages')===null){
        messageId='undefined';

    }
    
else{
     messagesLocal=JSON.parse(localStorage.getItem('messages'));
    messageId=messagesLocal[messagesLocal.length-1].id

    }
    let currentgroup=localStorage.getItem('currentGroup');
         
        
        
    
        
    
    
        const arrayofmessages=await axios.get(`http://35.153.200.187:2000/user/get/messages/${currentgroup}?messageId=${messageId}`)
        
        
        
        let  mergedArray=[];
        console.log(arrayofmessages.data.message.length);
        
        if(messagesLocal!=null){
            if(messagesLocal.length===10){
                messagesLocal.splice(0,arrayofmessages.data.message.length);
               }
             mergedArray=[...messagesLocal,...arrayofmessages.data.message];

        }
        else{
            mergedArray=arrayofmessages.data.message;

        }
            
    
        localStorage.setItem('messages',JSON.stringify(mergedArray));
        const addmessages=JSON.parse(localStorage.getItem('messages'));
        
        for(const element of addmessages){
            try{
                const username=await axios.get(`http://35.153.200.187:2000/user/get/userData/${element.userId}`)
                console.log(username);
                const child2=`<p>${username.data.data.name}: ${element.message}</p>`
                chatWindow.innerHTML+=child2;

            }
            catch(err){
                console.log(err)

            }
        }



         const memberdiv=document.getElementById('members');
         const memberlist=document.getElementById('memberlist');
        const users=await axios.get(`http://35.153.200.187:2000/usergroups/get/userData/${currentgroup}`);
        console.log('this is members data=='+users.data);
        for(const user of users.data){
            const u=await axios.get(`http://35.153.200.187:2000/user/get/userData/${user.userId}`);
            const child=`<li id="${u.data.data.id}">${u.data.data.name} <button onclick=deleteFromGroup("${u.data.data.id}")>delete</button><button id="${u.data.data.id}"onclick=addToadmin("${u.data.data.id}","${currentgroup}")>Make admin</button></li>`;
            memberlist.innerHTML+=child;

        }






    maindiv.style.display='block';
    memberdiv.style.display='block';
}
catch(err){console.log(err);}

    
}




 document.getElementById('submitform').addEventListener('click',addGroup);
  async function addGroup(e){
            try{
                e.preventDefault();
                const name=document.getElementById('groupname').value;
                
                console.log('submit button running');
            
                const res=await axios.post('http://35.153.200.187:2000/group/post/data',{groupName:name,users:selectedOptions});
                console.log('post is working'+res.data.message);
                if(res.data.message==='sucess'){
                    showgroupbutton(res.data.groupdata);
                    
                    await axios.get(`http://35.153.200.187:2000/admin/post/data/${res.data.groupdata.id}`,{headers:{"Authorization":token}});
                    
                    
        
        
                }
            
        
            }
            catch(err){
                console.log(err);
            }
           
        
            
             }




 async function showgroupbutton(groups){
           
            const name=groups.name;

            const parent =document.getElementById('formbuttonplace');
            const button=`<button onclick=showGroup("${groups.id}")>${name}</button>`;
            parent.innerHTML+=button;

        }

const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const searchResults = document.getElementById('search-results');
searchButton.addEventListener('click', performSearch);

async function performSearch(){
    try{ const searchTerm=searchInput.value.trim();
        const res=await axios.get(`http://35.153.200.187:2000/user/search/${searchTerm}`);
        const child =`<p>${res.data.name}</p><button onclick=addUserToGroup("${res.data.id}")>add</button>`;
        searchResults.innerHTML=child;}
        catch(err){
            console.log(err);
        }
   




}
async function addUserToGroup(id){
    try{  const groupId=localStorage.getItem('currentGroup');
    await axios.post('http://35.153.200.187:2000/usergroups/add',{userId:id,groupId:groupId});
    

}
catch(err){
    console.log(err);
}
  
}



async function deleteFromGroup(id){
    //const chatWindow=document.getElementById('room');
    //const child=`<p>${user.name} is removed.</p>`
    //chatWindow.innerHTML+=child;
    console.log('in delete group');

    const res=await axios.get(`http://35.153.200.187:2000/usergroups/delete/${id}`);
    if(res.data.message==='success'){

        const html=document.getElementById(id);
        html.remove();


    }



}

async function addToadmin(uid,gid){
    const res=await axios.post(`http://35.153.200.187:2000/admin/makeadmin`,{userId:uid,groupId:gid});    
    //if(res.data.message==='sucess'){
        //const d=document.getElementById(currentgroup);
        //d.remove();    
    //}

}














