const myForm = document.getElementById("myForm");



    myForm.addEventListener("submit", handleSubmit);



    function handleSubmit(event) {
      event.preventDefault();

      const formData = new FormData(myForm);

      fetch("http://localhost:8000/api/post", {
        method: "POST",
        body: formData,
      })
      .then(response => response.json())
      .then(data => {
        // Handle successful response
        alert("Thank you for joining us, we will soon contact you!!")
        // window.location = "/";
      })
      .catch(error => {
        // Handle error response
        if (error instanceof TypeError) {
          alert("Network error. Please try again later.");
        } else if (error instanceof Error) {
          alert(error.message);
        }
      });
    }

    
    