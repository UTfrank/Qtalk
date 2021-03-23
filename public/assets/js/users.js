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