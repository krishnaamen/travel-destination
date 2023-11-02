const password = document.getElementById("password");
const confirm_password = document.getElementById("confirm_password");
function validatePassword() {
  if (password.value != confirm_password.value) {
    confirm_password.setCustomValidity("Passwords Don't Match");
  } else {
    confirm_password.setCustomValidity("");
  }
}

password.onchange = validatePassword;

confirm_password.onkeyup = validatePassword;

/*

  function CheckPassword(inputtxt)
  {
  var passw=  /^[A-Za-z]\w{7,14}$/;
  if(inputtxt.value.match(passw))
  {
  return true;
  }
  else
  {
  password.setCustomValidity("Invalid password");
  confirm_password.setCustomValidity("Invalid password");
  return false;
  }
  }


*/

document.addEventListener("DOMContentLoaded", function () {
  const registrationForm = document.getElementById("registrationForm");

  registrationForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirm_password = document.getElementById("confirm_password").value;

    const body = JSON.stringify({
      username: username,
      email: email,
      password: password,
      confirm_password: confirm_password,
    });
    const headers = {
      "Content-Type": "application/json",
    };
    //console.log(body);

    fetch("/auth/register", {
      method: "POST",
      body: body,
      headers: headers,
    })
      .then((response) => {
        if (response.ok) {
          window.location.href = "/";
          console.log(response);
        } else {
          // Registration failed
          alert("Registration failed");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
});
