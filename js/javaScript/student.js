let studentTable=document.querySelector("table")
let addStudenTable=async function(){
    let response=await  fetch("https://node-monge-iti-project.herokuapp.com/students");
    let studentData =await response.json();
  //console.log(data,typeof data);
    
    for(i in studentData){
        let tr=document.createElement("tr")
        let tdName=document.createElement("td")
        tdName.innerText=studentData[i].Name
        tdID=document.createElement("td")
        trId=document.createElement("tr")
        tdID.innerText=studentData[i]._id
        console.log(tdID.innerText)
        trId.append(tdID)
        trId.style.display="none"
        studentTable.append(trId)
        //tdID.style.display="none"
        // console.log(tdName.innerText)   
        tr.append(tdName)
        let tdDepartment=document.createElement("td")
        tdDepartment.innerText=studentData[i].Department.Name
        tr.append(tdDepartment)
        td=document.createElement("td")
        let updateButton=document.createElement("button")
        updateButton.innerText="update"//function to update
        td.append(updateButton)
        updateButton.addEventListener("click",function (){
            tdName.innerHTML=`<input type="text" value=${tdName.innerText}/>`
            updateButton.style.display="none"
            editeButton.style.display="inline-block"
            cancelButton.style.display="inline-block"
            tdDepartment.innerHTML=`<select></select>`
            
            adddepartmentTable()
        });
        //debugger
        let editeButton=document.createElement("button")
        let newStudentName;
        
        editeButton.innerText="Edite"//function to edite
        editeButton.style.display="none"
        editeButton.addEventListener('click', async function(){
            newStudentName=document.querySelector("input")
            option=document.querySelector("select")

            response=await fetch("https://node-monge-iti-project.herokuapp.com/students",{
                method:"put",
                body:JSON.stringify({id:tdID,name:newStudentName.value, department:{_id:option.value}}),
                headers:{"Content-Type":"application/json"},
                
            })
            let data =await response.json();
            console.log(data,typeof data)
            
        })
        td.append(editeButton)
        tr.append(td)
        let cancelButton=document.createElement("button")
        cancelButton.innerText="cancel"//function to cancel
        cancelButton.style.display="none"
        td.append(cancelButton)
        tr.append(td)
        let deletButton=document.createElement("button")
        deletButton.innerText="delete"//function to delete
        deletButton.addEventListener("click", async function () {
            tdDepartment.innerHTML=`<select></select>`
            let option=document.querySelector("select")
            adddepartmentTable()
            let response=await  fetch("https://node-monge-iti-project.herokuapp.com/students",{
                method:"delete",
                body:JSON.stringify({id:tdID.innerText}),
                headers:{"Content-Type":"application/json"}
            });
            let data =await response.text()
            console.log(data,typeof data);
            
        });
        td.append(deletButton)
        tr.append(td)
        
        studentTable.append(tr)
    }
    
}
addStudenTable()
//to get the id,department name
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


