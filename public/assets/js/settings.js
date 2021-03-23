function _(str) {
  return document.querySelector(str);
}

axios.defaults.baseURL = `https://us-central1-qtalk-4dd0f.cloudfunctions.net/`;

//Create Admin
const createAdminForm = _("#crAdminForm");
const createAdminFormBtn = _("#createAdminBtn");

if(createAdminForm) {

    createAdminForm.addEventListener('submit', function(e) {
        e.preventDefault();

        createAdminFormBtn.setAttribute("disabled", true);
        createAdminFormBtn.innerHTML = `<i class="fa fa-spinner fa-spin fa-2x fa-fw"></i>
        <span class="sr-only">Loading...</span>`;

        const fName = _("#craFn").value;
        const lName = _("#craLn").value;
        const userName = _("#craUn").value;
        const email = _("#craEm").value;
        const pwd = _("#craPw").value
    
        const userData = {
            firstName: fName,
            lastName: lName,
            username: userName,
            email: email,
            password: pwd,
            imageUrl: 'default'
        }
    
        const createAdminUrl = "createAdmin";
    
        axios.post(createAdminUrl, userData).then(function(response) {
            
            console.log(response.data)

            createAdminFormBtn.removeAttribute("disabled");
            createAdminFormBtn.innerHTML = `Update`;

            // const token = response.data.data.uid;
            // localStorage.getItem('usertoken', token);
            // console.log(token);

            // const name = response.data.data.username;
            // localStorage.setItem('uname', name);
            // console.log(name);

            setTimeout(() => {
              location.replace("/public/settings.html")
            }, 3000);
    
        }).catch(function(err) {
            // console.log(err.response);
            createAdminFormBtn.removeAttribute("disabled");
            createAdminFormBtn.innerHTML = `Update`;
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

//Change Username
const changeUserForm = _("#chuserForm");
const changeUserFormBtn = _("#changeUsrNameBtn");

if(changeUserForm) {

    changeUserForm.addEventListener('submit', function(e) {
        e.preventDefault();

        changeUserFormBtn.setAttribute("disabled", true);
        changeUserFormBtn.innerHTML = `<i class="fa fa-spinner fa-spin fa-2x fa-fw"></i>
        <span class="sr-only">Loading...</span>`;

        const usrName = _("#username").value;
    
        const userData = {
            usernameAdmin: usrName,
            uid: localStorage.getItem('usertoken')
        }
    
    
        const changeUserUrl = "changeAdminUsername";
    
        axios.post(changeUserUrl, userData).then(function(response) {
            
            console.log(response.data)

            const name = response.data.data.user.username;
            localStorage.setItem('uname', name);
            console.log(name);

            Swal.fire({
              position: 'center',
              icon: 'success',
              title: `Username updated successfully`,
              showConfirmButton: false,
              timer: 5000
            })

            changeUserFormBtn.removeAttribute("disabled");
            changeUserFormBtn.innerHTML = `Update`;

            // const token = response.data.data.uid;
            // localStorage.getItem('usertoken', token);
            // console.log(token);

            // const name = response.data.data.username;
            // localStorage.setItem('uname', name);
            // console.log(name);

            setTimeout(() => {
              location.replace("/public/settings.html")
            }, 3000);
            
    
        }).catch(function(err) {
            console.log(err.response)
            changeUserFormBtn.removeAttribute("disabled");
            changeUserFormBtn.innerHTML = `Update`;
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