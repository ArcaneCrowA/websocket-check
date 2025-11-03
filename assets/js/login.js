document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const loginSection = document.getElementById("login-section");
  const userSession = document.getElementById("user-session");
  const logoutButton = document.getElementById("logout-button");

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
      console.log("Login response:", data);

      if (data.type === "auth_success" && data.jwt) {
        console.log("n9s function:", typeof n9s);
        console.log("SDK object:", window.N9sSDK);

        const initializeN9s = () => {
          n9s("init", {
            appId: "app_VDKIiNKEkpKbIgDR",
            userToken: data.jwt,
            user_id: data.user_id,
            organization_id: data.organization_id,
          });
          if (window.N9sSDK) {
            console.log(window.N9sSDK?._config);
          }

          alert("Login successful!");
          loginSection.style.display = "none";
          userSession.style.display = "block";
        };

        const waitForN9s = () => {
          if (typeof n9s === "function") {
            console.log("N9sSDK loaded, proceeding with initialization");
            const originalN9s = window.n9s;
            window.n9s = function (command, config) {
              if (command === "init") {
                console.log("N9s SDK Configuration:", config);
              }
              return originalN9s.apply(this, arguments);
            };
            initializeN9s();
          } else {
            console.log("N9sSDK not yet loaded, retrying...");
            setTimeout(waitForN9s, 500); // Retry every 500ms
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

  logoutButton.addEventListener("click", () => {
    n9s("shutdown");
    alert("Logout successful!");
    loginSection.style.display = "block";
    userSession.style.display = "none";
  });
});
