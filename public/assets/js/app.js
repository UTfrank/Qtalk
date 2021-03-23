// // Preloader
// function preloader() {
//     console.log('hello');
//     if ($('#preloader').length) {
//       $('#preloader').delay(100).fadeOut('slow', function() {
//         $(this).remove();
//       });
//     }
// }
  
// $(window).on('load', preloader());

function _(str) {
    return document.querySelector(str);
}

axios.defaults.baseURL = `https://us-central1-qtalk-4dd0f.cloudfunctions.net/`;

// check if there is a token
const checkToken = !! localStorage.getItem("usertoken");

// the path we dont want just anyone to see
if(location.pathname == "/public/index.html") {
    console.log('index page')


    // if there's no token, redirect the user to loging
    if(!checkToken) {
        location.replace('/public/login.html');
    }

}

//Logout Admin 
const logOut = _("#logout");
if (logOut) {
    logOut.addEventListener('click', (e) => {
        e.preventDefault();
        const logOutUrl = "loginOutAdmin";
        axios.get(logOutUrl).then(function(response){
            console.log(response);
            localStorage.clear();
            window.location.replace("/public/login.html");
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
// const allUsersMsg = _("#singleUser");

if (allUsers) {
    const allUsersUrl = "getUsers";
    axios.get(allUsersUrl).then(function(response){
        console.log(response.data.data);
        const users = response.data.data;
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

    }).catch(function(err) {
        console.log(err);
    })
}

// Add Cou
const addCouForm = _("#addCouForm");
const addCouBtn = _("#addCouBtn");

if(addCouForm) {

    addCouForm.addEventListener('submit', function(e) {
        e.preventDefault();

        addCouBtn.setAttribute("disabled", true);
        addCouBtn.innerHTML = `<i class="fa fa-spinner fa-spin fa-2x fa-fw"></i>
        <span class="sr-only">Loading...</span>`;

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
    
    
        const addCouUrl = "createUser";
    
        axios.post(addCouUrl, userData).then(function(response) {
            
            // console.log(response.data)

            // const token = response.data.data.uid;
            // localStorage.setItem('usertoken', token);
            // console.log(token);

            // const name = response.data.data.username;
            // localStorage.setItem('uname', name);
            // console.log(name);

            addCouBtn.removeAttribute("disabled");
            addCouBtn.innerHTML = `Add Counselor`;

            swal.fire({
                position: 'center',
                icon: 'success',
                timer: 3000,
                title: 'Counselor added Successfully'
            })

            setTimeout(() => {
                location.replace("/public/counselors.html")
            }, 3000)

            
    
        }).catch(function(err) {
            // console.log(err.response);
            addCouBtn.removeAttribute("disabled");
            addCouBtn.innerHTML = `Add Counselor`;
            swal.fire({
                position: 'center',
                icon: 'error',
                title: `${err.response.data.message}`,
                timer: 3000
            })
        })
    

    })

}

// All Counselors
const allCounselors = _("#allCounselors");
const counselorTable = _("#couTable");

if (allCounselors) {
    const allCounselorsUrl = "getCounsellors";
    axios.get(allCounselorsUrl).then(function(response){
        // console.log(response.data.data);
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
            // console.log(response.data.data.length);
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
    const reportsUrl = "getReport";
    axios.get(reportsUrl).then(function(response){
        const allReports = response.data.data;
        console.log(allReports);
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

// Blocked Users
const blockedUsers = _("#blockedUsers");

if (blockedUsers) {
    const blockedUsersUrl = "getBlockedUsers";
    axios.get(blockedUsersUrl)
    .then(function(response){
        allBlockedUsers = response.data.data;
        if(response.data.data.length == 0){
            blockedUsers.innerHTML = `
            <tr>
                <div class="text-center mt-4">No Recently Blocked Users</div>
            </tr>
            `
            
        } else {
            let content = '';
            for (var i in allBlockedUsers) {
                content += `
                <tr>
                    <td>  <span class="name">${allBlockedUsers[i].username}</span> </td>
                    <td> <span>${allBlockedUsers[i].category}</span> </td>
                    <td><span>${allBlockedUsers[i].complain}</span></td>
                    <!-- <td>
                        <span class="badge badge-complete">Complete</span>
                    </td> -->
                </tr>`;
            }
            reports.innerHTML = content; 
        }
    }).catch(err => {
        console.log(err);
    });
}

// Send Notifications

const sendNotificationForm = _("#sendNotificationForm");
const sendNotificationFormBtn = _("#sendNotificationFormBtn");
const notificationMessage = _("#notificationMessage");
const radio1 = _("#radio1");
const radio2 = _("#radio2");
const radio3 = _("#radio3");
let selectAllUsersDropdown = _("#selectAllUsersDropdown");
let selectAllUsersContainer = _("#selectAllUsersContainer");

const toggleSelectUser = () => {
    if (radio3.checked) {
        selectAllUsersContainer.classList.remove('d-none');
    } else if (!radio3.checked) {
        selectAllUsersContainer.classList.add('d-none');
    }
}

if(sendNotificationForm) {

    sendNotificationForm.addEventListener('submit', function(e) {
        e.preventDefault();

        sendNotificationFormBtn.setAttribute("disabled", true);
        sendNotificationFormBtn.innerHTML = `<i class="fa fa-spinner fa-spin fa-2x fa-fw"></i>
        <span class="sr-only">Loading...</span>`;

        if (radio1.checked) {
            const userData = {
                messages: notificationMessage.value
            }  
            
            const sendNotificationFormUrl = "sendNotificationToCounsellor";
    
            axios.post(sendNotificationFormUrl, userData).then(function(response) {
                
                // console.log(response.data)

                // const token = response.data.data.uid;
                // localStorage.setItem('usertoken', token);
                // console.log(token);

                // const name = response.data.data.username;
                // localStorage.setItem('uname', name);
                // console.log(name);

                sendNotificationFormBtn.removeAttribute("disabled");
                sendNotificationFormBtn.innerHTML = `<i class="pe-7s-paper-plane"></i>`;

                swal.fire({
                    position: 'center',
                    icon: 'success',
                    timer: 3000,
                    title: 'Message Sent'
                })

                setTimeout(() => {
                    location.replace("/public/index.html")
                }, 3000)

                
        
            }).catch(function(err) {
                // console.log(err.response);
                sendNotificationFormBtn.removeAttribute("disabled");
                sendNotificationFormBtn.innerHTML = `<i class="pe-7s-paper-plane"></i>`;
                swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: `${err.response.data.message}`,
                    timer: 3000
                })
            })
        }
        
        if (radio2.checked) {
            const userData = {
                messages: notificationMessage.value
            }  
            
            const sendNotificationFormUrl = "sendNotificationToUser";
    
            axios.post(sendNotificationFormUrl, userData).then(function(response) {
                
                // console.log(response.data)

                // const token = response.data.data.uid;
                // localStorage.setItem('usertoken', token);
                // console.log(token);

                // const name = response.data.data.username;
                // localStorage.setItem('uname', name);
                // console.log(name);

                sendNotificationFormBtn.removeAttribute("disabled");
                sendNotificationFormBtn.innerHTML = `<i class="pe-7s-paper-plane"></i>`;

                swal.fire({
                    position: 'center',
                    icon: 'success',
                    timer: 3000,
                    title: 'Message Sent'
                })

                setTimeout(() => {
                    location.replace("/public/index.html")
                }, 3000)

                
        
            }).catch(function(err) {
                // console.log(err.response);
                sendNotificationFormBtn.removeAttribute("disabled");
                sendNotificationFormBtn.innerHTML = `<i class="pe-7s-paper-plane"></i>`;
                swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: `${err.response.data.message}`,
                    timer: 3000
                })
            })
        }
        
        if (radio3.checked) {
            let selectedOption = selectAllUsersDropdown.options[selectAllUsersDropdown.selectedIndex].getAttribute('value');
            let selectedOpionArray = selectedOption.split(',');
            console.log(selectedOpionArray[1]);

            const userData = {
                messages: notificationMessage.value,
                uid: selectedOpionArray[1],
                token: selectedOpionArray[0],
                type: "user"
            }
    
            // console.log(userData);
        
        
            const sendNotificationFormUrl = "sendNotificationToToken";
        
            axios.post(sendNotificationFormUrl, userData).then(function(response) {
                
                // console.log(response.data)
    
                sendNotificationFormBtn.removeAttribute("disabled");
                sendNotificationFormBtn.innerHTML = `<i class="pe-7s-paper-plane"></i>`;
    
                swal.fire({
                    position: 'center',
                    icon: 'success',
                    timer: 3000,
                    title: 'Message Sent'
                })
    
                setTimeout(() => {
                    location.replace("/public/index.html")
                }, 3000)
    
                
        
            }).catch(function(err) {
                // console.log(err.response);
                sendNotificationFormBtn.removeAttribute("disabled");
                sendNotificationFormBtn.innerHTML = `<i class="pe-7s-paper-plane"></i>`;
                swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: `${err.response}`,
                    timer: 3000
                })
            })
        }
    
        
    

    })
    
}
