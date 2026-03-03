import jwt from "jsonwebtoken";
import { getData } from "../db-helper.js";

export const authenticateAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "No token provided"
      });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Invalid token format"
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🔴 MOST IMPORTANT LINE
    const adminId = decoded.admin_id;

    if (!adminId) {
      return res.status(401).json({
        success: false,
        message: "Invalid admin token"
      });
    }

    const admins = await getData("admin", `WHERE id=${adminId}`);
    if (!admins.length) {
      return res.status(401).json({
        success: false,
        message: "Admin not found"
      });
    }

    const admin = admins[0];

    if (admin.status !== "active") {
      return res.status(403).json({
        success: false,
        message: "Admin inactive"
      });
    }

    // ✅ REQUIRED FOR SERVICE.JS
    req.user = {
      id: admin.id,
      role: "admin"
    };

    // Optional
    req.admin = admin;

    next();
  } catch (err) {
    console.error("ADMIN AUTH ERROR 👉", err.message);
    return res.status(401).json({
      success: false,
      message: "Unauthorized"
    });
  }
};
