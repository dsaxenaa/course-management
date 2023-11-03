import Jwt from "jsonwebtoken";

// this is the authentication function where we are receving the jwt token from the header of the request and then verifying the user.
export const AuthMiddleware = (req, res, next) => {
  // console.log(req.headers)
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access Denied!" });
  }

  const token = authHeader.split("Bearer ")[1];
  // console.log(token)

  try {
    const decoded = Jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    req.user = decoded;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token!" });
  }
};
