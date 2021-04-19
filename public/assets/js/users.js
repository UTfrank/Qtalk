$(document).ready(function() {
  var table = $('#data-table').DataTable( {
      "ajax": {
          "url": "https://us-central1-nfcs-7ab10.cloudfunctions.net/getUsers",
          "data": "",
          "dataSrc": function (response) {
              var tableData = response.data;
              // console.log(tableData);
              var return_data = new Array();
              var tokensArr = new Array();
              for(const person of tableData){ 

                  const tokens = {}
                  tokens[person.uid] = person.token

                  
                  tokensArr.push(tokens)
                  return_data.push({
                  'name': `<span>  ${person.username} </span> <i class="fa fa-circle ${(person.online == 'true') ?  'color-green'  : 'color-red'}" style="font-size:5px"></i>  `,
                  'phone' : person.phone,
                  'email': person.email
                  })
              }
              // console.log(tokensArr);
              localStorage.setItem('tokens', JSON.stringify(tokensArr)); 
              return return_data;
          }
      },
      dom: 'Bfrtip',
      buttons: [
          'copyHtml5',
          'excelHtml5',
          'csvHtml5',
          'pdfHtml5'
      ],
      "columns": [
              {
              "className":      'details-control',
              "orderable":      false,
              "targets":        -1,
              "data":           null,
              "defaultContent": ''
          },
          {"data" : "name"},
          {"data" : "phone"},
          {"data" : "email"}
      ],  
      "order": [[0, 'asc']],
      "bDestroy": true
  });
});

function _(str) {
    return document.querySelector(str);
}
  
axios.defaults.baseURL = `https://us-central1-qtalk-4dd0f.cloudfunctions.net/`;

let blockButton;
let unBlockButton;
window.addEventListener('click',event => {
  blockButton = event.target.closest('.block');
  // console.log("i was clicked");
  blockButton.setAttribute("disabled", true);
  blockButton.innerHTML = `<i class="fa fa-spinner fa-spin fa-2x fa-fw"></i>
  <span class="sr-only">Loading...</span>`;
  let id = blockButton.getAttribute('id');
  let token;
  let checkBlockedUser;

  

  // console.log(userData);

  const blockUserUrl = "blockUser";
  const getUsersUrl = "getUsers";

  axios.get(getUsersUrl)
  .then(response => {
    let userRef = response.data.data;

    userRef.forEach(user => {
      // console.log(user.uid)
      if (id == user.uid) {
        // console.log(user.blocked)
        return token = user.token, checkBlockedUser = user.blocked
      }
    });
    // console.log(checkBlockedUser);

    const userData = {
      uid: id,
      token: token
    };
    // console.log(userData);

    if (checkBlockedUser == 'true') {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: `User is already blocked`,
        showConfirmButton: false,
        timer: 3000
      })
      
      blockButton.removeAttribute("disabled");
      blockButton.innerHTML = `Block User`;
    } else {
      axios.post(blockUserUrl, userData)
      .then(response => {
        console.log(response)

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `${response.data.message}`,
          showConfirmButton: false,
          timer: 3000
        })

        
        blockButton.removeAttribute("disabled");
        blockButton.innerHTML = `Block User`;

        setTimeout(() => {
          location.replace("/users.html")
        }, 3000);

      })
    }

    
  })
  
});

window.addEventListener('click',event => {
  unBlockButton = event.target.closest('.unblock');
  // console.log("i was clicked");
  unBlockButton.setAttribute("disabled", true);
  unBlockButton.innerHTML = `<i class="fa fa-spinner fa-spin fa-2x fa-fw"></i>
  <span class="sr-only">Loading...</span>`;
  let id = unBlockButton.getAttribute('id');
  let checkBlockedUser;

  

  // console.log(userData);

  const restoreUserUrl = "restoreUser";
  const getUsersUrl = "getUsers";

  axios.get(getUsersUrl)
  .then(response => {
    let userRef = response.data.data;
    // console.log(userRef)

    userRef.forEach(user => {
      // console.log(user.uid)
      if (id == user.uid) {
        // console.log(user.blocked)
        return token = user.token, checkBlockedUser = user.blocked
      }
    });
    // console.log(checkBlockedUser);

    const userData = {
      uid: id
    };
    // console.log(userData);

    if (checkBlockedUser == 'false') {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: `User has not been blocked`,
        showConfirmButton: false,
        timer: 3000
      })
      
      unBlockButton.removeAttribute("disabled");
      unBlockButton.innerHTML = `Block User`;
    } else {
      axios.post(restoreUserUrl, userData)
      .then(response => {
        console.log(response)

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `${response.data.message}`,
          showConfirmButton: false,
          timer: 3000
        })

        
        unBlockButton.removeAttribute("disabled");
        unBlockButton.innerHTML = `Unblock User`;

        setTimeout(() => {
          location.replace("/users.html")
        }, 3000);

      })
      .catch(err => {
        console.log(err.response)
      })
    }

    
  })
  .catch(err => {
    console.log(err.response)
  })
  
});