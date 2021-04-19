function _(str) {
  return document.querySelector(str);
}

// check if there is a token
const checkToken = !!localStorage.getItem("usertoken");

// the path we dont want just anyone to see
if (location.pathname == "/chat.html") {
  // if there's no token, redirect the user to loging
  if (!checkToken) {
    location.replace("/login.html");
  }
}

axios.defaults.baseURL = `https://us-central1-qtalk-4dd0f.cloudfunctions.net/`;

var queryString = location.search.substring(1);
console.log(queryString);

const groupMembers = _("#left-panel");

if (groupMembers) {
  window.addEventListener("load", () => {
    // e.preventDefault();

    const groupName = queryString;

    const userData = {
      name: groupName,
    };

    // console.log(userData);

    const groupMembersUrl = "getGroupMembers";

    axios
      .post(groupMembersUrl, userData)
      .then((response) => {
        // console.log(response.data)

        const allMembers = response.data.data;
        if (allMembers.length > 0) {
          let content = "";
          for (var i in allMembers) {
            content += `
                  <div class="col-md-12 p-0">
                      <div class="profile-nav alt col-12 p-1">
                          <section class="card side-card">
                              <div class="list-group list-group-flush">
                                  <div class="list-group-item">
                                      ${allMembers[i].name}
                                      <button class="btn float-right uid" id="${allMembers[i].uid}">
                                          <i class="fa fa-lock"></i>
                                      </button>
                                  </div>
                              </div>
                          </section>
                      </div>
                  </div>`;
          }
          groupMembers.insertAdjacentHTML("beforeend", content);
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  });
}

const groupMessage = _("#messageBox");

if (groupMessage) {
  // console.log('page is fully loaded');
  // });
  window.addEventListener("load", () => {
    // e.preventDefault();

    const groupName = queryString;

    const userData = {
      name: groupName,
    };

    // console.log(userData);

    const groupMessageUrl = "getGroupMessage";

    axios
      .post(groupMessageUrl, userData)
      .then((response) => {
        // console.log(response.data)

        const allMessages = response.data.data;
        if (allMessages.length > 0) {
          let content = "";
          for (var i in allMessages) {
            content += `
                  <ul>
                      <li>
                          <div class="msg-received msg-container">
                              <!-- <div class="avatar">
                                  <img src="images/avatar/64-1.jpg" alt="">
                              </div> -->
                              <div class="msg-box">
                                  <div class="inner-box">
                                      <div class="name">
                                          ${allMessages[i].senderName}
                                      </div>
                                      <div class="meg">
                                          ${allMessages[i].message}
                                      </div>
                                  </div>
                                  <div class="send-time">${new Date(
                                    allMessages[i].date
                                  ).toLocaleDateString("en-US")}, ${new Date(
              allMessages[i].date
            ).toLocaleTimeString("en-US")}</div> 
                              </div>
                          </div>
                      </li>
                      <!-- <li>
                          <div class="msg-sent msg-container">
                              <div class="avatar">
                                  <img src="images/avatar/64-2.jpg" alt="">
                              </div>
                              <div class="msg-box">
                                  <div class="inner-box">
                                      <div class="name">
                                          John Doe
                                      </div>
                                      <div class="meg">
                                          Hay how are you doing?
                                      </div>
                                  </div>
                                  <div class="send-time">11.11 am</div>
                              </div>
                          </div>
                      </li> -->
                  </ul>`;
          }
          groupMessage.innerHTML = content;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
}

jQuery(document).ready(function ($) {
  $("body").on("click", "button.uid", function () {
    var thisID = $(this).attr("id");
    console.log(thisID);
    let groupName = queryString;
    let uid = thisID;
    var obj = {};
    obj.name = groupName;
    obj.id = uid;

    $.ajax({
      url:
        "https://us-central1-nfcs-7ab10.cloudfunctions.net/blockUserFromGroup",
      headers: { "Access-Control-Allow-Origin": "http://127.0.0.1:8080" },
      method: "POST",
      dataType: "json",
      data: {
        groupName: obj.name,
        uid: obj.id,
      },
    })
      .done(function (data) {
        console.log(data);
        $(this).addClass("color-red");
      })
      .fail(function (err) {
        console.log(err);
      });
  });
});
