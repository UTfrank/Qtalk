function _(str) {
    return document.querySelector(str);
}



// check if there is a token
const checkToken = !! localStorage.getItem("usertoken");

// the path we dont want just anyone to see
if(location.pathname == "/index.html") {

    // if there's no token, redirect the user to loging
    if(!checkToken) {
    location.replace('/login.html');
    }

}

// Login Admin
const loginForm = _("#loginForm");

if(loginForm) {

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const email = _("#lemail").value;
        const pwd = _("#lpwd").value;
    
        const userData = {
            email: email,
            password: pwd
        }
    
    
        const loginUrl = "https://us-central1-qtalk-4dd0f.cloudfunctions.net/loginAdmin";
    
        axios.post(loginUrl, userData).then(function(response) {
            
            console.log(response.data)

            const token = response.data.data.uid;
            localStorage.setItem('usertoken', token);
            console.log(token);

            const name = response.data.data.username;
            localStorage.setItem('uname', name);
            console.log(name);

            swal.fire({
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                title: 'Signin Successful'
            })

            location.replace("/index.html")
    
        }).catch(function(err) {
            console.log(err.response)
        })
    

    })

}

//Logout Admin 
const logOut = _("#logout");
if (logOut) {
    logOut.addEventListener('click', (e) => {
        e.preventDefault();
        const logOutUrl = "https://us-central1-nfcs-7ab10.cloudfunctions.net/loginOutAdmin";
        axios.get(logOutUrl).then(function(response){
            console.log(response);
            localStorage.clear();
            window.location.replace("/login.html");
        }).catch(function(err) {
            console.log(err.response)
        })
    })
}

//Dashboard Page
//user name
const userName = _("#userName");
if (userName) {
    userName.innerHTML = `<a class="nav-link" id="userName"><i class="fa fa-user"></i>${localStorage.getItem('uname')}</a>`;
}

// All Users
const allUsers = _("#allUsers");
const allUsersMsg = ("#singleUser");

if (allUsers) {
    const allUsersUrl = "https://us-central1-nfcs-7ab10.cloudfunctions.net/getUsers";
    axios.get(allUsersUrl).then(function(response){
        console.log(response.data.data);
        const users = response.data.data
        allUsers.innerHTML = `
        <div class="card">
            <div class="card-body">
                <div class="stat-widget-five">
                    <div class="stat-icon dib flat-color-1">
                        <ion-icon name="person-outline"></ion-icon>
                    </div>
                    <div class="stat-content">
                        <div class="text-left dib">
                            <div class="stat-text"><span class="count">${response.data.number}</span></div>
                            <div class="stat-heading">Total Users</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `

        for(const person of users){
            allUsersMsg.innerHTML = `
            <option value="" label="default"></option>
            <optgroup label="All Users">
                <option id="${person.uid}">${person.username}</option>
            </optgroup>
            `
        }

    }).catch(function(err) {
        console.log(err.response);
    })
}

// Add Cou
const addCouForm = _("#addCouForm");

if(addCouForm) {

    addCouForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const username = _("#couUserName").value;
        const email = _("#couEmail").value;
        const designation = _("#couDesig").value;
        const phone = _("#couMobile").value;
        const gender = `${(_("#couGender").value == '1') ?  'male'  : 'female'}`;
        const password = _("#couPass").value;
        const bio = _("#couBio").value;
    
        const userData = {
            email: email,
            password: password,
            bio: bio,
            username: username,
            phone: phone,
            designation: designation,
            gender: gender,
        }

        // console.log(userData);
    
    
        const addCouUrl = "https://us-central1-qtalk-4dd0f.cloudfunctions.net/createUser";
    
        axios.post(addCouUrl, userData).then(function(response) {
            
            console.log(response.data)

            // const token = response.data.data.uid;
            // localStorage.setItem('usertoken', token);
            // console.log(token);

            // const name = response.data.data.username;
            // localStorage.setItem('uname', name);
            // console.log(name);

            swal.fire({
                position: 'center',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                title: 'Counselor added Successfully'
            })

            location.replace("/counselors.html")
    
        }).catch(function(err) {
            console.log(err.response)
        })
    

    })

}

// All Counselors
const allCounselors = _("#allCounselors");
const counselorTable = _("#couTable");

if (allCounselors) {
    const allCounselorsUrl = "https://us-central1-nfcs-7ab10.cloudfunctions.net/getCounsellors";
    axios.get(allCounselorsUrl).then(function(response){
        console.log(response.data.data);
        allCounselors.innerHTML = `
        <div class="card">
            <div class="card-body">
                <div class="stat-widget-five">
                    <div class="stat-icon dib flat-color-1">
                        <ion-icon name="person-outline"></ion-icon>
                    </div>
                    <div class="stat-content">
                        <div class="text-left dib">
                            <div class="stat-text"><span class="count">${response.data.number}</span></div>
                            <div class="stat-heading">Total Counsellors</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;

        if (response.data.data.length > 0) {
            console.log(response.data.data.length);
            let counTablecontent = '';
            for (var i in response.data.data) {
                counTablecontent += `
                <tr>
                    <td>${response.data.data.username}</td>
                    <td>${response.data.data.gender}</td>
                    <td class="flat-color-5">${(response.data.data.blocked) ? 'Blocked' : 'Unblocked'}</td>
                    <td>
                        <button id="payment-button" class="btn bg-transparent color-black" data-toggle="modal" data-target="#viewCounselorModal">View Profile</button>
                    </td>
                    <td>
                        <button id="payment-button" class="btn bg-transparent color-red">
                            <ion-icon name="trash-outline"></ion-icon>
                        </button>
                    </td>
                </tr>
                `;
            }
            // console.log(counTablecontent);
            // counselorTable.innerHTML = counTablecontent;
        }

    }).catch(function(err) {
        console.log(err.response);
    })
}

// Reports
const reports = _("#reports");

if (reports) {
    const reportsUrl = "https://us-central1-nfcs-7ab10.cloudfunctions.net/getReport";
    axios.get(reportsUrl).then(function(response){
        const allReports = response.data.data;
        if (allReports.length > 0) {
            let content = '';
            for (var i in allReports) {
                content += `
                <tr>
                    <td>  <span class="name">${allReports[i].username}</span> </td>
                    <td> <span>${allReports[i].category}</span> </td>
                    <td><span>${allReports[i].complain}</span></td>
                    <!-- <td>
                        <span class="badge badge-complete">Complete</span>
                    </td> -->
                </tr>`;
            }
            reports.innerHTML = content;
        }
    }).catch(function(err) {
        console.log(err.response);
    })
}

//CHATS
//create group chats
const createGroupForm = _("#createGroupForm");

if(createGroupForm) {

    createGroupForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const createdBy = _("#gCreator").value;
        const desc = _("#gDesc").value;
        const imageUrl = _("#gImage").value;
        const members = _("#gNumber").value;
        const name = _("#gName").value;
    
        const userData = {
            createdBy: createdBy,
            desc: desc,
            imageUrl: imageUrl,
            members: members,
            name: name
        }

        console.log(userData);
    
    
        const createGroupUrl = "https://us-central1-qtalk-4dd0f.cloudfunctions.net/createGroupChat";
    
        axios.post(createGroupUrl, userData).then(function(response) {
            
            console.log(response.data)

            // const token = response.data.data.uid;
            // localStorage.setItem('usertoken', token);
            // console.log(token);

            // const name = response.data.data.username;
            // localStorage.setItem('uname', name);
            // console.log(name);

            
            window.location.replace("/chats.html")

    
        }).catch(function(err) {
            console.log(err.response)
        })
    

    })

}

//Change Username
const changeUserForm = _("#chuserForm");

if(changeUserForm) {

    changeUserForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const usrName = _("#username").value;
    
        const userData = {
            usrName: usrName,
            uid: localStorage.getItem('usertoken')
        }
    
    
        const changeUserUrl = "https://us-central1-nfcs-7ab10.cloudfunctions.net/changeAdminUsername";
    
        axios.post(changeUserUrl, userData).then(function(response) {
            
            console.log(response.data)

            // const token = response.data.data.uid;
            // localStorage.getItem('usertoken', token);
            // console.log(token);

            // const name = response.data.data.username;
            // localStorage.setItem('uname', name);
            // console.log(name);

            // location.replace("/index.html")
    
        }).catch(function(err) {
            console.log(err.response)
        })
    

    })

}

//Create Admin
const createAdminForm = _("#crAdminForm");

if(createAdminForm) {

    createAdminForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const fName = _("#craFn").value;
        const lName = _("#craLn").value;
        const userName = _("#craUn").value;
        const email = _("#craEm").value;
        const pwd = _("#craPw").value;
        const img = _("#customFile")
    
        const userData = {
            fName: fName,
            lName: lName,
            userName: userName,
            email: email,
            pwd: pwd,
            img: 'default'
        }
    
        console.log(userData);
    
        const createAdminUrl = "https://us-central1-nfcs-7ab10.cloudfunctions.net/createAdmin";
    
        axios.post(createAdminUrl, userData).then(function(response) {
            
            console.log(response.data)

            // const token = response.data.data.uid;
            // localStorage.getItem('usertoken', token);
            // console.log(token);

            // const name = response.data.data.username;
            // localStorage.setItem('uname', name);
            // console.log(name);

            // location.replace("/index.html")
    
        }).catch(function(err) {
            console.log(err.response)
        })
    

    })

}