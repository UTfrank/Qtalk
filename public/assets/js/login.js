function _(str) {
  return document.querySelector(str);
}

// check if there is a token
const checkToken = !! localStorage.getItem("usertoken");

// the path we dont want just anyone to see
if(location.pathname == "/index.html") {
    console.log('index page')


    // if there's no token, redirect the user to loging
    if(!checkToken) {
        location.replace('/login.html');
    }

}

axios.defaults.baseURL = `https://us-central1-qtalk-4dd0f.cloudfunctions.net/`;

// Login Admin
const loginForm = _("#loginForm");
const loginFormBtn = _("#lbtn");

if(loginForm) {

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        loginFormBtn.setAttribute("disabled", true);
        loginFormBtn.innerHTML = `<i class="fa fa-spinner fa-spin fa-2x fa-fw"></i>
        <span class="sr-only">Loading...</span>`;

        const email = _("#lemail").value;
        const pwd = _("#lpwd").value;
    
        const userData = {
            email: email,
            password: pwd
        }
    
    
        const loginUrl = "loginAdmin";
    
        axios.post(loginUrl, userData)
        .then(response => {
            
            console.log(response.data)

            loginFormBtn.removeAttribute("disabled");
            loginFormBtn.innerHTML = `Sign in`;

            const token = response.data.data.uid;
            localStorage.setItem('usertoken', token);
            console.log(localStorage.getItem("usertoken"));

            const name = response.data.data.username;
            localStorage.setItem('uname', name);
            console.log(name);

            Swal.fire({
                position: 'center',
                icon: 'success',
                title: `Login Successful`,
                showConfirmButton: false,
                timer: 3000
            })

            setTimeout(() => {
                location.replace("/index.html")
            }, 3000);
    
        })
        .catch(err => {
            loginFormBtn.removeAttribute("disabled");
            loginFormBtn.innerHTML = `Sign in`;
            console.log(err.response)
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: `${err.response.data.message}`,
              showConfirmButton: false,
              timer: 5000
            })
        })
    

    })

}