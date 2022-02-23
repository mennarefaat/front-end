let studentTable=document.querySelector('table')
async function buildTable(){
    let response=await  fetch("https://node-monge-iti-project.herokuapp.com/students");
    let data =await response.json();
    console.log(data,typeof data);
    
    for(student in data){
        let tr = document.createElement("tr")
        let tdName=document.createElement("td")
        tdName.innerText=data[student].Name
        console.log(tdName.innerText)
        tr.append(tdName)
        let tdDepartment=document.createElement("td")
        tdDepartment.innerText=data[student].Department.Name
        tr.append(tdDepartment)
        tdoption=document.createElement("td")
        select=document.createElement("select")
        option=document.createElement("option")
        option.value=data[student].Department._id
        option.innerText=data[student].Department.Name
        console.log(option.value)
        select.append(option)
        tdDepartment.append(select)
        studentTable.append(tr)
        tr = document.createElement("tr")
        let tdID=document.createElement("td")
        tdID.innerText=data[student]._id
        console.log(tdID.innerText)
        tr.append(tdID)
        tr.style.display="none"
        studentTable.append(tr)
    }
}






buildTable();