import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import db from "../../config/db.js";

/* =========================
   TOKEN GENERATORS
========================= */

const generateAccessToken = (user) =>
    jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "15m" }
    );

const generateRefreshToken = (user) =>
    jwt.sign(
        { id: user.id },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY || "7d" }
    );

/* =========================
   SIGNUP
========================= */

export const signup = async ({ full_name, email, password, role }) => {
    const [existing] = await db.query(
        "SELECT id FROM users WHERE email=?",
        [email]
    );

    if (existing) throw new Error("Email already registered");

    const hashed = await bcrypt.hash(password, 10);

    await db.query(
        "INSERT INTO users (full_name, email, password, role) VALUES (?,?,?,?)",
        [full_name, email, hashed, role || "user"]
    );

    return { message: "Signup successful" };
};

/* =========================
   LOGIN
========================= */

export const login = async ({ email, password, role, device_info, ip }) => {

    const [user] = await db.query(
        "SELECT * FROM users WHERE email=? AND role=? AND deleted_at IS NULL",
        [email, role]
    );

    if (!user) throw new Error("User not found");

    if (["blocked", "suspended", "deleted"].includes(user.status))
        throw new Error(`Account ${user.status}`);

    if (user.lock_until && new Date(user.lock_until) > new Date())
        throw new Error("Account temporarily locked. Try later.");

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        const attempts = user.login_attempts + 1;
        let lockUntil = null;

        if (attempts >= 5)
            lockUntil = new Date(Date.now() + 15 * 60 * 1000);

        await db.query(
            "UPDATE users SET login_attempts=?, lock_until=? WHERE id=?",
            [attempts, lockUntil, user.id]
        );

        throw new Error("Invalid credentials");
    }

    await db.query(
        `UPDATE users 
     SET login_attempts=0,
         lock_until=NULL,
         last_login_at=NOW(),
         last_login_ip=? 
     WHERE id=?`,
        [ip, user.id]
    );

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    const expiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await db.query(
        "INSERT INTO user_sessions (user_id, refresh_token, device_info, ip_address, expires_at) VALUES (?,?,?,?,?)",
        [user.id, refreshToken, device_info || "Unknown", ip || "0.0.0.0", expiry]
    );

    return {
        access_token: accessToken,
        refresh_token: refreshToken
    };
};

/* =========================
   REFRESH TOKEN
========================= */

export const refreshAccessToken = async (refresh_token) => {

    const decoded = jwt.verify(refresh_token, process.env.JWT_REFRESH_SECRET);

    const [session] = await db.query(
        "SELECT * FROM user_sessions WHERE refresh_token=?",
        [refresh_token]
    );

    if (!session) throw new Error("Invalid session");
    if (new Date(session.expires_at) < new Date())
        throw new Error("Session expired");

    const [user] = await db.query(
        "SELECT id, role FROM users WHERE id=?",
        [decoded.id]
    );

    const newAccess = generateAccessToken(user);
    const newRefresh = generateRefreshToken(user);

    const newExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await db.query(
        "UPDATE user_sessions SET refresh_token=?, expires_at=? WHERE id=?",
        [newRefresh, newExpiry, session.id]
    );

    return {
        access_token: newAccess,
        refresh_token: newRefresh
    };
};

/* =========================
   LOGOUT
========================= */

export const logout = async (refresh_token) => {
    await db.query(
        "DELETE FROM user_sessions WHERE refresh_token=?",
        [refresh_token]
    );
    return { message: "Logged out successfully" };
};

export const logoutAll = async (userId) => {
    await db.query(
        "DELETE FROM user_sessions WHERE user_id=?",
        [userId]
    );
    return { message: "Logged out from all devices" };
};

/* =========================
   FORGOT PASSWORD
========================= */

export const forgotPassword = async (email) => {

    const [user] = await db.query(
        "SELECT id FROM users WHERE email=?",
        [email]
    );

    if (!user)
        return { message: "If account exists, reset link sent." };

    const token = crypto.randomBytes(32).toString("hex");
    const expiry = new Date(Date.now() + 15 * 60 * 1000);

    await db.query(
        "UPDATE users SET reset_password_token=?, reset_password_expiry=? WHERE id=?",
        [token, expiry, user.id]
    );

    return { reset_token: token };
};

/* =========================
   RESET PASSWORD
========================= */

export const resetPassword = async (token, newPassword) => {

    const [user] = await db.query(
        "SELECT * FROM users WHERE reset_password_token=?",
        [token]
    );

    if (!user) throw new Error("Invalid token");
    if (new Date(user.reset_password_expiry) < new Date())
        throw new Error("Token expired");

    const hashed = await bcrypt.hash(newPassword, 10);

    await db.query(
        `UPDATE users 
     SET password=?, 
         password_changed_at=NOW(),
         reset_password_token=NULL,
         reset_password_expiry=NULL
     WHERE id=?`,
        [hashed, user.id]
    );

    return { message: "Password reset successful" };
};

/* =========================
   CHANGE PASSWORD
========================= */

export const changePassword = async (userId, oldPassword, newPassword) => {

    const [user] = await db.query(
        "SELECT password FROM users WHERE id=?",
        [userId]
    );

    const match = await bcrypt.compare(oldPassword, user.password);
    if (!match) throw new Error("Old password incorrect");

    const hashed = await bcrypt.hash(newPassword, 10);

    await db.query(
        "UPDATE users SET password=?, password_changed_at=NOW() WHERE id=?",
        [hashed, userId]
    );

    return { message: "Password changed successfully" };
};