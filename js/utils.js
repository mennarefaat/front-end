const baseURL = "https://node-monge-iti-project.herokuapp.com/";

// GET async function
const getData = async (endpoint = "") => {
  const response = await fetch(baseURL + endpoint);

  try {
    const newData = await response.json();
    return newData;
  } catch (e) {
    console.log(e);
  }
};

// POST async function
const postData = async (endpoint = "", data = {}) => {
  const response = await fetch(baseURL + endpoint, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    console.log(newData);
    return newData;
  } catch (e) {
    console.log(e);
    return e;
  }
};

// DELETE async function
const deleteData = async (endpoint = "", data = {}) => {
  const response = await fetch(baseURL + endpoint, {
    method: "DELETE",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (e) {
    console.log(e);
  }
};

// PUT async function
const putData = async (endpoint = "", data = {}) => {
  const response = await fetch(baseURL + endpoint, {
    method: "PUT",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (e) {
    console.log(e);
  }
};

const renderStudentsTable = (tableBody) => {
  tableBody.innerHTML = "";
  getData("students").then(function (students) {
    console.log(students);
    for (const student of students) {
      // create table records
      const tr = document.createElement("tr");
      for (const key in student) {
        const td = document.createElement("td");
        switch (key) {
          // case "Name":
          //   td.textContent = student[key];
          //   tr.append(td);
          //   break;
          // case "Department":
          //   td.textContent = student[key]?.Name;
          //   tr.append(td);
          case "Name":
          case "Department":
            td.textContent = student[key]?.Name || student[key];
            tr.append(td);
        }
      }

      // create update button
      {
        const btnUpdate = document.createElement("button");
        btnUpdate.textContent = "Update";
        btnUpdate.classList.add("btn", "btn-success");
        btnUpdate.addEventListener("click", function () {
          console.log(this);
          const usernameTd = this.closest("tr").children[0];
          const departmentTd = this.closest("tr").children[1];

          // change to update mode
          {
            // user input
            const input = document.createElement("input");
            {
              input.value = usernameTd.textContent;
              usernameTd.innerHTML = "";
              usernameTd.append(input);
            }

            // department select
            const select = document.createElement("select");
            {
              getData("departments").then((departments) => {
                const departmentOptions = departments.map((department) => {
                  const option = document.createElement("option");
                  option.textContent = department.Name;
                  option.value = department._id;
                  return option;
                });

                select.append(...departmentOptions);

                departmentTd.innerHTML = "";
                departmentTd.append(select);
              });
            }

            // edit & cancel buttons
            {
              const btnEdit = document.createElement("button");
              btnEdit.textContent = "Edit";
              btnEdit.classList.add("btn", "btn-success");
              btnEdit.addEventListener("click", function () {
                putData("students", {
                  id: student._id,
                  name: input.value,
                  department: select.value,
                }).then((data) => {
                  renderStudentsTable(tableBody);
                });
              });

              const btnCancel = document.createElement("button");
              btnCancel.textContent = "Cancel";
              btnCancel.classList.add("btn", "btn-warning");
              btnCancel.addEventListener("click", function () {
                renderStudentsTable(tableBody);
              });

              this.closest("td").append(btnEdit, btnCancel);

              this.remove();
            }
          }
        });

        const td = document.createElement("td");
        td.append(btnUpdate);
        tr.append(td);
      }

      // create Delete button
      {
        const btnDelete = document.createElement("button");
        btnDelete.textContent = "Delete";
        btnDelete.classList.add("btn", "btn-danger");
        btnDelete.addEventListener("click", function () {
          console.log(student._id);
          deleteData("students", {
            id: student._id,
          });
          this.closest("tr").remove();
        });

        const td = document.createElement("td");
        td.append(btnDelete);
        tr.append(td);
      }

      tableBody.append(tr);
    }
  });
};

export { getData, postData, deleteData, putData, renderStudentsTable };
