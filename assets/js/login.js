document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const loginSection = document.getElementById("login-section");
  const userSessionElements = document.querySelectorAll(".user-session");
  const logoutButton = document.getElementById("logout-button");

  const updateUI = () => {
    if (sessionStorage.getItem("isLoggedIn") === "true") {
      if (loginSection) {
        loginSection.style.display = "none";
      }
      userSessionElements.forEach((el) => (el.style.display = "block"));
    } else {
      if (loginSection) {
        loginSection.style.display = "block";
      }
      userSessionElements.forEach((el) => (el.style.display = "none"));
    }
  };

  updateUI();

  if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();

      const formData = new URLSearchParams();
      formData.append("username", username);
      formData.append("password", password);

      try {
        const response = await fetch("https://23.88.42.122/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.type === "auth_success" && data.token) {
          const initializeN9s = () => {
            window.n9s("init", {
              appId: "app_VDKIiNKEkpKbIgDR",
              userToken: data.token,
              user_id: data.user_id,
              organization_id: "1",
            });
            sessionStorage.setItem("isLoggedIn", "true");
            alert("Login successful!");
            updateUI();
          };

          const waitForN9s = () => {
            if (typeof window.n9s === "function") {
              initializeN9s();
            } else {
              setTimeout(waitForN9s, 100);
            }
          };

          waitForN9s();
        } else {
          throw new Error("Token not provided");
        }
      } catch (error) {
        console.error("Login error:", error);
        alert(error.message);
      }
    });
  }

  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      if (typeof window.n9s === "function") {
        window.n9s("shutdown");
      }
      sessionStorage.removeItem("isLoggedIn");
      alert("Logout successful!");
      updateUI();
      window.location.href = "index.html";
    });
  }
});
