let userName=window.localStorage.getItem('name')
let userPassword=window.localStorage.getItem("password")
let loginName=document.querySelector('input[type=text]')
let loginPassord=document.querySelector('input[type=password]')
let loginButton=document.querySelector("button[type=submit]")
loginButton.addEventListener('click',function(event){
    if(loginName.value!=userName&&loginPassord.value!=userName){
        event.preventDefault()
    }

})
