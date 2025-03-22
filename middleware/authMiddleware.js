import jwt from "jsonwebtoken";

export function authenticateToken(req, res, next) {
  const token = req.cookies.authToken;
  if (!token) {
    return res.status(401).json({ message: "UnAuthorized" });
  }
  try {
    const secretKey = process.env.SECRET_KEY;
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        console.error("Token Verification Error:", err);
        return res.status(403).json({ error: "Invalid Token", err });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    console.error("Error verifying JWT:", error);
    return res.status(403).json({ message: "Invalid token." });
  }
}
