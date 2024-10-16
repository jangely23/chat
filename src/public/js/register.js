const login = document.querySelector('#login');

login.addEventListener('click', (e) => {
    const user = document.querySelector('#username').value;

    if (user === '') {
        alert('Username is required');
    }else {
        document.cookie = `username=${user}`;
        document.location.href = '/';
    }
})