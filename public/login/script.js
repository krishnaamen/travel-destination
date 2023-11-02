document
  .getElementById("login-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    // Get the input values
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      // Make a POST request to your Node.js endpoint
      const response = await fetch("/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      console.log("response goes here  -->  ", response);

      if (response.status === 200) {
        window.location.href = "/";
      } else {
        // Display an error message based on the response
        const responseData = await response.json();
        document.getElementById("error-message").textContent =
          responseData.message;
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle any network or other errors here
    }
  });
