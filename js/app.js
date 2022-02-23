document.querySelector("form").addEventListener("click", function (e) {
  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;

  console.log(username, password);

  if (
    username !== localStorage.getItem("username") ||
    password !== localStorage.getItem("password")
  )
    e.preventDefault();
});
