import * as AuthService from "./service.js";

export const signup = async (req, res) => {
    try {
        const data = await AuthService.signup(req.body);
        res.status(201).json({ success: true, data });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

export const login = async (req, res) => {
    try {
        const data = await AuthService.login({
            ...req.body,
            device_info: req.headers["user-agent"],
            ip: req.ip
        });
        res.json({ success: true, data });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

export const refresh = async (req, res) => {
    try {
        const data = await AuthService.refreshAccessToken(req.body.refresh_token);
        res.json({ success: true, data });
    } catch (err) {
        res.status(401).json({ success: false, message: err.message });
    }
};

export const logout = async (req, res) => {
    const data = await AuthService.logout(req.body.refresh_token);
    res.json({ success: true, data });
};

export const logoutAll = async (req, res) => {
    const data = await AuthService.logoutAll(req.user.id);
    res.json({ success: true, data });
};

export const forgotPassword = async (req, res) => {
    const data = await AuthService.forgotPassword(req.body.email);
    res.json({ success: true, data });
};

export const resetPassword = async (req, res) => {
    const data = await AuthService.resetPassword(
        req.body.token,
        req.body.new_password
    );
    res.json({ success: true, data });
};

export const changePassword = async (req, res) => {
    const data = await AuthService.changePassword(
        req.user.id,
        req.body.old_password,
        req.body.new_password
    );
    res.json({ success: true, data });
};