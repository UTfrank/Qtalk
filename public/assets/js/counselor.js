$(document).ready(function () {
  var table = $("#data-table").DataTable({
    ajax: {
      url: "https://us-central1-nfcs-7ab10.cloudfunctions.net/getCounsellors",
      data: "",
      dataSrc: function (response) {
        var tableData = response.data;
        // console.log(tableData);
        var return_data = new Array();
        var tokensArr = new Array();
        for (const person of tableData) {
          const tokens = {};
          tokens[person.uid] = person.token;

          tokensArr.push(tokens);
          return_data.push({
            name: `<span>  ${person.username} </span> <i class="fa fa-circle ${
              person.online == "true" ? "color-green" : "color-red"
            }" style="font-size:5px"></i>  `,
            phone: person.phone,
            email: person.email,
          });
        }
        // console.log(tokensArr);
        localStorage.setItem("tokens", JSON.stringify(tokensArr));
        return return_data;
      },
    },
    dom: "Bfrtip",
    buttons: ["copyHtml5", "excelHtml5", "csvHtml5", "pdfHtml5"],
    columns: [
      {
        className: "details-control",
        orderable: false,
        targets: -1,
        data: null,
        defaultContent: "",
      },
      { data: "name" },
      { data: "phone" },
      { data: "email" },
    ],
    order: [[0, "asc"]],
    bDestroy: true,
  });
});

function _(str) {
    return document.querySelector(str);
}
  
axios.defaults.baseURL = `https://us-central1-qtalk-4dd0f.cloudfunctions.net/`;

// Block Counsellors

let blockCounselorsBtn;

window.addEventListener('click', e => {
    blockCounselorsBtn = e.target.closest('.block');
    console.log(blockCounselorsBtn);

    blockCounselorsBtn.setAttribute("disabled", true);
    blockCounselorsBtn.innerHTML = `<i class="fa fa-spinner fa-spin fa-2x fa-fw"></i>
    <span class="sr-only">Loading...</span>`;

    let id = blockCounselorsBtn.getAttribute('id');
    let token;
    let checkBlockedCounselor;

    const blockUserUrl = "blockUser";
    const getCounsellorsUrl = "getCounsellors";

    axios.get(getCounsellorsUrl)
    .then( response => {
        console.log(response)
        let counsellorsRef = response.data.data;

        counsellorsRef.forEach(counselor => {
          if(id == counselor.uid) return token = counselor.token , checkBlockedCounselor = counselor.blocked;
        });

        const userData = {
          uid:id,
          token:token
        }

        if(checkBlockedCounselor == 'true') {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: `User is already blocked`,
            showConfirmButton: false,
            timer: 3000
          })
          
          blockCounselorsBtn.removeAttribute("disabled");
          blockCounselorsBtn.innerHTML = `<i class="fa fa-times color-red"></i>`;
        } else {
          axios.post(blockUserUrl, userData)
          .then(response => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: `${response.data.message}`,
              showConfirmButton: false,
              timer: 3000
            })
    
            
            blockCounselorsBtn.removeAttribute("disabled");
            blockCounselorsBtn.innerHTML = `<i class="fa fa-times color-red"></i>`;
    
            setTimeout(() => {
              location.replace("/counselors.html")
            }, 3000);
          })
          .catch(err => {
            console.log(err)
          })
        }
    })
    .catch(err => {
        console.log(err)
    })

})