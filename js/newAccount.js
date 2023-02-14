const nameLogin = document.getElementById('input-login');
const password1 = document.getElementById('input-password');
const repeatPassword = document.getElementById('input-password2');

const form = document.querySelector('.forms');
const users = JSON.parse(localStorage.getItem('infoLista')) || [] ;

form.addEventListener('submit', (event) => {
    event.preventDefault()
    userRegister()
});

function userRegister() {

    const checkUser = users.some((user) => user.name === nameLogin.value);
    if (checkUser) {
        alert("Cadastro realizado com sucesso !")
        return
    }
    if(password1.value !== repeatPassword.value) {
        alert('As senhas devem ser iguais')
        return
    }

    const newUser = {
        name: nameLogin.value,
        password: password1.value,
        posts: []
    }  
    
    users.push(newUser);
    localStorage.setItem('infoLista', JSON.stringify(users));

    
    alert('Conta cadastrada com sucesso!')
    window.location.href = 'index.html'
};
  
