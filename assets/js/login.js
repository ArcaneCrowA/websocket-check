document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    fetch("https://example.com/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Login failed");
        }
        return response.json();
      })
      .then((data) => {
        if (data.token) {
          n9s("init", {
            appId: "app_KMcmsLocpKKRmByk", // Application ID from CRM system
            userToken: data.token, // JWT token for personalized notifications
            user_id: data.user_id, // User ID from your system
            organization_id: "1", // Company ID from our CRM system
          });
          alert("Login successful!");
        } else {
          throw new Error("Token not provided");
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
        alert(error.message);
      });
  });
});
