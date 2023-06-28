const updateForm = document.getElementById("loginform");

updateForm.addEventListener("submit", updatesubmit);

function updatesubmit(event) {
  event.preventDefault();

  const updateData = new FormData(updateForm);
  const id = localStorage.getItem("id");
  updateData.append("id", id);

  const data = Object.fromEntries(updateData.entries());

  fetch("http://localhost:8000/api/login/update", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message) {
        alert(data.message);
        window.location.reload();
      } else {
        window.location = "http://127.0.0.1:5500/server/aisu_mail/home.html";
      }
    })
    .catch((error) => {
      alert("An error occurred. Please try again.");
      console.log(error);
    });
}
