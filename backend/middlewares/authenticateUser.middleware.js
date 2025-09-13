import jwt from "jsonwebtoken";


export const protect = (req, res, next) => { 
  const token = req.cookies.accessToken;

  if (!token) return res.status(401).json({ message: "token not recieved" });


  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
