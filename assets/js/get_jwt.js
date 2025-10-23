// Get JWT token from your backend for the current user
fetch("/api/get-n9s-jwt", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
})
  .then((response) => response.json())
  .then((data) => {
    if (data.token) {
      n9s("init", {
        appId: "app_KMcmsLocpKKRmByk", // Application ID from CRM system
        userToken: data.token, // JWT token for personalized notifications
        user_id: data.user_id, // User ID from your system
        organization_id: "1", // Company ID from our CRM system
      });
    }
  });
