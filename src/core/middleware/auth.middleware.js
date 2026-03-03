import jwt from "jsonwebtoken";
import db from "../../config/db.js";

export const authenticate = async (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header) throw new Error("No token");

    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    const [user] = await db.query(
      "SELECT id, role FROM users WHERE id=?",
      [decoded.id]
    );

    if (!user) throw new Error("User not found");

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
};