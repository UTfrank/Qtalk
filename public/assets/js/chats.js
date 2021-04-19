function _(str) {
  return document.querySelector(str);
}

// check if there is a token
const checkToken = !!localStorage.getItem("usertoken");

// the path we dont want just anyone to see
if (location.pathname == "/chats.html") {
  // if there's no token, redirect the user to loging
  if (!checkToken) {
    location.replace("/login.html");
  }
}

axios.defaults.baseURL = `https://us-central1-qtalk-4dd0f.cloudfunctions.net/`;

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
    
    
        const createGroupUrl = "createGroupChat";
    
        axios.post(createGroupUrl, userData).then(function(response) {

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

$(document).ready(function() {
  var table = $('#bootstrap-data-table').DataTable( {
      "ajax": {
          "url": "https://us-central1-nfcs-7ab10.cloudfunctions.net/getGroupChat",
          "data": "",
          "dataSrc": function (response) {
              var tableData = response.data;
              console.log(tableData);
              var return_data = new Array();
              for(var i=0;i< tableData.length; i++){
                  return_data.push({
                  'imageUrl'  : '<img src="' + tableData[i].imageUrl + '" width="50">',
                  'name': '<a href="chat.html?' + tableData[i].name + '" class="group-name">'+ tableData[i].name +'</a>',
                  'description': tableData[i].desc,
                  'createdBy': tableData[i].createdBy,
                  'members': tableData[i].members
                  })
              }
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
          {"data" : "imageUrl"},
          {"data" : "name"},
          {"data" : "description"},
          {"data" : "createdBy"},
          {"data" : "members"},
          {"defaultContent": '<button class="btn bg-transparent color-red delGroup"><ion-icon name="trash-outline"></ion-icon></button>'}
      ],  
      "bDestroy": true
  });
  
  $('#bootstrap-data-table tbody').on( 'click', 'button', function () {
      var tr = $(this).closest("tr");
      var name = tr.find("td>a").text();
      
      var obj = {};
      obj.name = name;

      $.ajax({
          url: 'https://us-central1-qtalk-4dd0f.cloudfunctions.net/deleteGroup',
          headers: { 'Access-Control-Allow-Origin': 'http://127.0.0.1:8080' },
          method: 'POST',
          dataType: 'json',
          data: {
              "groupName": obj.name
          }
      }).done(function(data) {
          tr.remove();
          window.location.replace("/chats.html")
      }).fail(function(err) {
          console.log(err);
      })
  } );
});