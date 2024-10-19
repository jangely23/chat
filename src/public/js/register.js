const login = document.querySelector('#login');

login.addEventListener('click', (e) => {
    const user = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    const phone = document.querySelector('#phone').value;

    if (user === '') {
        alert('Username is required');
    }else {
        document.cookie = `username=${user}`;
        document.cookie = `email=${email}`;
        document.cookie = `phone=${phone}`;
        document.location.href = '/';
    }
})