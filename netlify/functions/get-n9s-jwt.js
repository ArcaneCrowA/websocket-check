const jwt = require("jsonwebtoken");

exports.handler = async function (event, context) {
  // In a real application, you would authenticate the user and get their details
  const user = {
    id: "12345",
    name: "Test User",
    email: "test@example.com",
  };

  // Use a secret key to sign the token. Store this securely!
  const secretKey = "YOUR_SECRET_KEY";

  const token = jwt.sign(user, secretKey, { expiresIn: "1h" });

  return {
    statusCode: 200,
    body: JSON.stringify({
      token: token,
      user_id: user.id,
    }),
  };
};
