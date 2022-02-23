let studentName=document.querySelector("input")
let department=document.querySelector('select')
let addButon=document.querySelector('button')
addButon.addEventListener('click',async function(){
    let response=await  fetch("https://node-monge-iti-project.herokuapp.com/students",{
        method:"post",
        body:JSON.stringify({ department:{_id:Number(department.value)},name:studentName.value}),
        headers:{"Content-Type":"application/json"}
     });
let data =await response.json();
console.log(data,typeof data,"ok");
})

let adddepartmentTable=async function(){
    let response=await  fetch("https://node-monge-iti-project.herokuapp.com/departments");
    let data =await response.json();
    console.log(data,typeof data)
    //let tr=document.createElement("tr")
    //let td=document.createElement("td")
    let select=document.querySelector("select")
    let option=document.createElement("option")
    
    for(i in data){
        option=document.createElement("option")
        option.value=data[i]._id
        option.innerHTML=data[i].Name
        
        select.append(option)
        
    }   
}
adddepartmentTable()
