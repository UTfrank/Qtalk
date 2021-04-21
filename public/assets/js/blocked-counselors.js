function _(str) {
  return document.querySelector(str);
}

axios.defaults.baseURL = `https://us-central1-qtalk-4dd0f.cloudfunctions.net/`;

// Unblock Counsellors

let unBlockBtn;
window.addEventListener('click', e => {
  unBlockBtn = e.target.closest('.unblock');
  unBlockBtn.setAttribute("disabled", true);
  unBlockBtn.innerHTML = `<i class="fa fa-spinner fa-spin fa-2x fa-fw"></i>
  <span class="sr-only">Loading...</span>`;

  let id = unBlockBtn.getAttribute('id');

  const restoreUserUrl = "restoreUser";

  const userData = {
    uid: id
  };
  console.log(userData);

  axios.post(restoreUserUrl, userData)
  .then(response => {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: `${response.data.message}`,
      showConfirmButton: false,
      timer: 3000
    })

    
    unBlockBtn.removeAttribute("disabled");
    unBlockBtn.innerHTML = `Unblock`;

    setTimeout(() => {
      location.replace("/blocked-counselors.html")
    }, 3000);
  })
  .catch(err => {
    console.log(err);
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: `${err}`,
      showConfirmButton: false,
      timer: 3000
    });
    unBlockBtn.removeAttribute("disabled");
    unBlockBtn.innerHTML = `Unblock`;
  })
})