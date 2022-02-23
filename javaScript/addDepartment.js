let nameDepartment=document.querySelector('input[type=text]')
let errmsg=document.querySelector("span")
let idDepartment=document.querySelector("input[type=number]")
let addButton=document.querySelector('button')
addButton.addEventListener("click" ,async function(){
    try {
        let response=await  fetch("https://node-monge-iti-project.herokuapp.com/departments",{
                method:"post",
                body:JSON.stringify({id:Number(idDepartment.value),name:nameDepartment.value}),
                headers:{"Content-Type":"application/json"}
            });
            let data =await response.json();
            console.log(data,typeof data);
            if(data.err){
                errmsg.style.display="inline-block"
    
            }else if(data._id){
                alert("success")
            }
            
        } catch (error) {
            console.log(error)
        }
    })  
    

  