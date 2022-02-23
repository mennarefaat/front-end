let departmentTable=document.querySelector("table")
let deletButton=document.querySelector("button[name=delete]")

let adddepartmentTable=async function(){
    let response=await  fetch("https://node-monge-iti-project.herokuapp.com/departments");
    let data =await response.json();
    console.log(data,typeof data)
    let tr=document.createElement("tr")
    let td=document.createElement("td")
    let select=document.querySelector("select")
    let option=document.createElement("option")
    
   
    for(i in data){
        option=document.createElement("option")
        option.value=data[i]._id
        option.innerHTML=data[i].Name
        
        select.append(option)
        
    }
    departmentTable.append(tr)
    
    
}

adddepartmentTable()
deletButton.addEventListener("click", async function(){
    let option=document.querySelector("select")
    let response=await  fetch("https://node-monge-iti-project.herokuapp.com/departments",{
        method:"delete",
        body:JSON.stringify({id:option.value}),
        headers:{"Content-Type":"application/json"}
    });
    let data =await response.json()
    console.log(data,typeof data);
})

let select=document.querySelector("select")
let editeInput=document.querySelector("input")
option=select.children

select.onchange=function(){
    i=select.options.selectedIndex
    editeInput.value=select[i].innerText
}

let editeButton=document.querySelector("button[name=update]")
editeButton.addEventListener("click",async function(){
    let option=document.querySelector("select")
    let response=await  fetch("https://node-monge-iti-project.herokuapp.com/departments",{
        method:"put",
        body:JSON.stringify({id:option.value,name:editeInput.value}),
        headers:{"Content-Type":"application/json"}
    });
    let data =await response.json();
    console.log(data,typeof data)
    
})


