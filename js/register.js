let elForm = document.querySelector(".register-form")

passwords = JSON.parse(localStorage.getItem("passwords")) || []

elForm.addEventListener("submit", function (e) {
    e.preventDefault()
    let data = {
        id: passwords.length + 1,
        username: e.target.username.value,
        password: e.target.password.value,
        firstname: e.target.firstName.value,
        lastname: e.target.lastName.value
    }

    passwords.push(data)
    localStorage.setItem("passwords", JSON.stringify(passwords))

    elForm.lastElementChild.previousElementSibling.innerHTML = `
    <img class="w-[30px] h-[30px] scale-[1.6] mx-auto" src="./images/louding.png" alt="Loading..." width="30" height="30">
  `

    setTimeout(() => {
        elForm.lastElementChild.previousElementSibling.innerHTML = 'Регистрация'
        setTimeout(() => {
            location.pathname = "/index.html"
        }, 600)
    }, 1000)
})
