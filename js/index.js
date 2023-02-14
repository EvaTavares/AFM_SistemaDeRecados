const email = document.getElementById('email-input');
const password = document.getElementById('password-input');
const formLog = document.getElementById('formulario-login')


const users = JSON.parse(localStorage.getItem('infoLista')) || [];

formLog.addEventListener('submit', (evento) => {
    evento.preventDefault();
    userLogin();
    window.location.href = 'posts.html'
    });

function userLogin() {
    const checkUser = users.find((user) => 
        user.name === email.value && user.password === password.value
    );

    const findUserIndex = users.findIndex(
        (user) => user.name === email.value
    );
   
    if(!checkUser){
        return alert("Verifique email ou senha");
    } 
    checkUser.logged = true;  
    
    sessionStorage.setItem('infoLista', JSON.stringify(checkUser));
    window.location.href = 'posts.html'

    // sessionStorage.setItem("loggedUser", JSON.stringify(checkUser));
    // window.location.href = "posts.html";
};



