
let studentsTable = document.querySelector("table");

let baseUrl = "https://node-monge-iti-project.herokuapp.com/";
//get Data
 let getData = async (url)=>
{
  let response = await fetch(baseUrl+url);
  let fetchedData = await response.json()
  return fetchedData;
}
//delete data
 let deleteData = async (url,data={})=>
{
  let response  = await fetch(baseUrl+url,{
    method:"DELETE",
    body: JSON.stringify(data),
    headers:{"Content-Type":"application/json"},
    })
}
 let putData = async (url,data={})=>
{
  let response = await fetch(baseUrl+url,{
    method:"PUT",
    body: JSON.stringify(data),
    headers:{"Content-Type":"application/json"},
  })
}

function reBuildTable(studentsTable){
studentsTable.innerHTML="";
getData("students").then(function(studentsData){
// --- > table headers
{
    const tableRow = document.createElement("tr");
    for (const key in studentsData[0]) {
      const th = document.createElement("th");
      switch (key) {
        case "Name":
        case "Department":
          th.innerText = key;
          tableRow.append(th);
          break;
      }
    }
    studentsTable.append(tableRow);
}
// --- > table records
{
for (const student of studentsData){
  const tableRow = document.createElement("tr");
  for (const key in student) {
    const td = document.createElement("td");
    switch(key)
    {
      case "Name":
      case "Department":
      td.innerText = student[key]?.Name||student[key];
      tableRow.append(td);
      break;
      }
    }

//update Button
{
  const updateButton = document.createElement("button")
  updateButton.innerText="UPDATE";
  updateButton.addEventListener("click",function(){
    let studentInput = this.closest("tr").children[0];
    let departmentInput = this.closest("tr").children[1];
  //make student input editable
  
    const nameInput = document.createElement("input");
    nameInput.value=studentInput.innerText;
    studentInput.innerHTML="";
    studentInput.append(nameInput);
  
  //make Department input editable
  
    const selectDepartment = document.createElement("select");
    getData("departments").then((departments)=>{
     const selectOptions = departments.map((department)=>{
      const departOption = document.createElement("option");
      departOption.innerText=department.Name;
      departOption.value=department._id;
      return departOption;
     });
     selectDepartment.append(...selectOptions)
      departmentInput.innerHTML = "";
      departmentInput.append(selectDepartment);
    }) // end of select department
  
   //Edit and cancle buttons
   {
     // --> edit button
     const editbutton = document.createElement("button");
     editbutton.innerText="Edit";
     editbutton.classList.add("edit");
     editbutton.addEventListener("click",function(){
      putData("students",{
        id: student._id,
        name: nameInput.value,
        department: selectDepartment.value,
      }).then((data)=>{reBuildTable(studentsTable)})
       }); // end event click of edit button

       //--> cancle button
       const cancleButton = document.createElement("button");
       cancleButton.innerText = "Cancel";
       cancleButton.classList.add("cancle");
       cancleButton.addEventListener("click", function () {
         reBuildTable(studentsTable);
       }); // end event click of cancle button
       this.closest("td").append(editbutton, cancleButton);
       this.remove();
   }
  })// end event click of update
  const td = document.createElement("td");
  td.append(updateButton);
  tableRow.append(td);
}
//delete Button
{
  const deleteButton = document.createElement("button");
  deleteButton.innerText="DELETE";
  deleteButton.classList.add("delete")
  deleteButton.addEventListener("click",function(){
    deleteData("students",{id:student._id})
    this.closest("tr").remove();
  })
  const td = document.createElement("td");
  td.append(deleteButton);
  tableRow.append(td);
}
  studentsTable.append(tableRow);
}
}
})}
reBuildTable(studentsTable);