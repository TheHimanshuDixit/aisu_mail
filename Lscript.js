const loginForm = document.getElementById("loginform");

loginForm.addEventListener("submit", loginsubmit);

function loginsubmit(event) {
  event.preventDefault();

  const LoginData = new FormData(loginForm);
  const data=Object.fromEntries(LoginData.entries());
  console.log(data);

  fetch("http://localhost:8000/api/login", {
    method: "POST",
    body: JSON.stringify(data),
    headers:{
      "Content-Type": "application/json",
    }
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message) {
        alert(data.message); // Show the message received from the backend
      } else {
        localStorage.setItem("jwt", data.token);
        localStorage.setItem("id",data.id);
        window.location = "http://127.0.0.1:5500/server/aisu_mail/home.html";
      }
    })
    .catch((error) => {
      alert("An error occurred. Please try again."); // Show a generic error message
      console.log(error);
    });
}
