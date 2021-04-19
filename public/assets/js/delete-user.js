function _(str) {
  return document.querySelector(str);
}

axios.defaults.baseURL = `https://us-central1-qtalk-4dd0f.cloudfunctions.net/`;

let deleteBtn;
window.addEventListener("click", (e) => {
  deleteBtn = e.target.closest(".delete");
  let parentTr = deleteBtn.parentElement.parentElement.children;
  let name = parentTr[1].childNodes[0].innerText;
  let id = deleteBtn.getAttribute('id');

  
  deleteBtn.setAttribute("disabled", true);
  deleteBtn.innerHTML = `<i class="fa fa-spinner fa-spin fa-2x fa-fw"></i>
  <span class="sr-only">Loading...</span>`;
  
  const deleteUserUrl = "deleteUser";
  
  const userData = {
    "username": name,
    "uid": id
  }
  console.log(userData);

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })
  
  swalWithBootstrapButtons.fire({
    title: 'Are you sure you want to delete this user?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel!',
    reverseButtons: true,
    showLoaderOnConfirm: true,
    allowOutsideClick: false,
    preConfirm: axios.post(deleteUserUrl, userData).then(response => {
      return response;
    })
    .catch(err => {
      Swal.showValidationMessage(
        `Request failed: ${err}`
      )
    })
  }).then((result) => {
    deleteBtn.removeAttribute("disabled");
    deleteBtn.innerHTML = `<ion-icon name="trash-outline"></ion-icon>`;
    if (result.isConfirmed) {
      swalWithBootstrapButtons.fire(
        'Deleted!',
        'User has been deleted.',
        'success'
      )
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      deleteBtn.removeAttribute("disabled");
      deleteBtn.innerHTML = `<ion-icon name="trash-outline"></ion-icon>`;
      swalWithBootstrapButtons.fire(
        'Cancelled',
        'Your imaginary file is safe :)',
        'error'
      )
    }
  })

  
  
});
