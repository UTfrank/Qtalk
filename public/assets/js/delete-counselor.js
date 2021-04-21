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
  

  axios.post(deleteUserUrl, userData)
  .then(response => {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: `User Deleted`,
      showConfirmButton: false,
      timer: 3000
    });
    deleteBtn.removeAttribute("disabled");
    deleteBtn.innerHTML = `<ion-icon name="trash-outline"></ion-icon>`;

    setTimeout(() => {
      location.replace(location.pathname)
    }, 3000);
  })
  .catch(err => {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: `Request failed: ${err.message}`,
      showConfirmButton: false,
      timer: 3000
    });
    deleteBtn.removeAttribute("disabled");
    deleteBtn.innerHTML = `<ion-icon name="trash-outline"></ion-icon>`;
  });

  
  
});
