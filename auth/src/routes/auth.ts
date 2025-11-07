import jwt from 'jsonwebtoken';
import express from 'express';
import path from 'path';
import multer from "multer";
import fs from "fs";
import { User } from '../models/User';
import { generateSalt, hashPassword, verifyPassword } from '../utils/password';
import { generateAccessToken, generateRefreshToken } from '../utils/token';

const router = express.Router();

const uploadDir = path.join(__dirname, "../../uploads"/* "..","oploads" */);

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, uploadDir),
    filename: (_req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() + 1E9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});

const upload = multer({ storage });

const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

router.post("/register", upload.single("photo"), async (req, res) => {
    try {
        const { email,
            password,
            fullName,
            phone,
            proffession,
            birthDate,
            gender,
            role
        } = req.body;

        if (await User.findOne({ email })) {
            res.status(400).json({ message: "Email already exists" });
            return;
        }

        const salt = generateSalt();
        const passwordHash = hashPassword(password, salt);
        const verificationCode = generateVerificationCode();
        const expires = new Date(Date.now() + 15 * 60 * 1000); //15 mins
        const photoUrl = req.file ? req.file.filename : gender == "male" ? "male.jpg" : "female.jpg";

        const user = new User({
            email,
            passwordHash,
            passwordSalt: salt,
            fullName,
            phone,
            proffession,
            birthDate: birthDate ? new Date(birthDate) : undefined,
            gender,
            role,
            photoUrl,
            verificationCode,
            verificationCodeExpires: expires,
        });

        await user.save();

        //TODO :onay kodunu email ya da sms ile gönder

        res.status(201).json({
            message: "registration successful", verificationCode
            /* id:user._id,
            email:user.email,
            fullName:user.fullName,
            phone:user.phone,
            proffession:user.proffession,
            birthDate:user.birthDate,
            photoUrl:user.photoUrl, */

        });

    }
    catch (err) {
        console.error(err)
        res.status(500).json({ message: "registration failed..." })
    }

});

router.post("/verify", async (req, res) => {
    const { email, code } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        if (user.isVerified) {
            res.status(400).json({ message: "user already verified" });
            return;
        }
        if (user.verificationCode !== code || new Date() > (user?.verificationCodeExpires ?? new Date())) {
            res.status(400).json({ message: " invalied or expired code" });
            return;
        }

        user.isVerified = true;
        user.verificationCode = undefined;
        user.verificationCodeExpires = undefined;

        const token = generateAccessToken({ id: user._id, role: user.role });

        const refreshToken = generateRefreshToken({ id: user._id });
        user.refreshToken = refreshToken;

        await user.save();

        res.status(200).json({ token, refreshToken })


    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "verification failed..." });

    }

});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !user.isVerified || user.isDeleted || !verifyPassword(password, user.passwordSalt!, user.passwordHash!)) {
            res.status(404).json({ message: "Invalid credentials " + user?.isVerified });
            return;
        }
        const token = generateAccessToken({ id: user._id, role: user.role });
        const refreshToken = generateRefreshToken({ id: user._id });
        user.refreshToken = refreshToken;
        await user.save();

        res.status(200).json({ token, refreshToken });


    } catch (err) {
        console.error(err)
        res.status(500).json({ message: "login failed..." })
        return;
    }
});

router.post("/refresh-token", async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        res.status(400).json({ message: "refresh token is required" });
        return;
    }
    try {
        const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as any;
        const now = Math.floor(Date.now() / 1000);
        if (payload.exp && payload.exp < now) {
            res.status(401).json({ message: "refresh token expired" })
            return;
        }

        const user = await User.findById(payload.id);
        if (!user || user.refreshToken !== refreshToken) {
            res.status(401).json({ message: "invalid refresch token" });
            return;
        }

        const newAccessToken = generateAccessToken({ id: user._id, rode: user.role });
        const newRefreshToken = generateRefreshToken({ id: user._id });
        user.refreshToken = newRefreshToken;
        await user.save();

        res.status(200).json({ token: newAccessToken, refreshToken: newRefreshToken });

    } catch (err) {
        console.error(err)
        res.status(500).json({ message: "refresh token failed..." })
        return;
    }
});

router.post("/logout", async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        res.status(404).json({ message: "refresh token is required" });
        return;
    }

    try {
        const user = await User.findOne({ refreshToken });
        if (!user) {
            res.status(404).json({ message: "already logged out" })
            return;
        }
        user.refreshToken = undefined;
        await user.save();
        res.status(200).json({ message: "logout successful" })
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: "logout failed..." })
        return;
    }
});

router.post("/forgot-password", async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ message: "user not found" })
            return;
        }
        const forgotPasswordCode = generateVerificationCode();
        const expires = new Date(Date.now() + 15 * 60 * 1000); // 15 mins
        user.forgotPasswordCode = forgotPasswordCode;
        user.forgotPasswordCodeExpires = expires;
        await user.save();

        res.status(200).json({
            message: "Forgot password code sent", forgotPasswordCode
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "forgot password request failed..." })
        return;
    }
});

router.post("/verify-forgot-password", async (req, res) => {

    const { email, code, newPassword } = req.body;
    try {

        const user = await User.findOne({ email });
        if (!user ||
            user.isDeleted ||
            user.forgotPasswordCode !== code ||
            new Date() > (user.forgotPasswordCodeExpires ?? new Date())
        ) {
            res.status(404).json({ message: "invalid or expired code.." });
            return;
        }
        const salt = generateSalt();
        const passwordHash = hashPassword(newPassword, salt);
        user.passwordHash = passwordHash;
        user.passwordSalt = salt;
        user.forgotPasswordCode = undefined;
        user.forgotPasswordCodeExpires = undefined;

        const token = generateAccessToken({ id: user._id, role: user.role });
        const refreshToken = generateRefreshToken({ id: user._id });
        user.refreshToken = refreshToken;
        await user.save();

        res.status(200).json({ token, refreshToken/*, message:"password resert successful" */ });
        //6 . video 11. dakka devam et

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "forgot password request failed..." });
        return;
    }
});

router.post("/reset-password", async (req, res) => {
    const { email, oldPassword, newPassword } = req.body;
    try {
        if (!email || !oldPassword || !newPassword) {
            res.status(400).json({ message: "Email, oldpassword and new password are required" });
            return;
        }
        const user = await User.findOne({ email });
        if (!user) {
            res.status(404).json({ message: "user not found" });
            return;
        }
        if (user.isDeleted) {
            res.status(400).json({ message: "user is deleted" });
            return;
        }
        if (!verifyPassword(oldPassword, user.passwordSalt!, user.passwordHash!)) {
            res.status(400).json({ message: "old pasword is incorrect" });
            return;
        }
        const salt = generateSalt();
        const passwordHash = hashPassword(newPassword, salt);
        user.passwordHash = passwordHash;
        user.passwordSalt = salt;

        await user.save();
        res.status(200).json({ message: "password reset successful" });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "reset password failed" });
    }
});

router.get("/user/:id", async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId).select("-passwordHash -passwordSalt -refreshToken -verificationCode -verificationCodeExpires -forgotPasswordCode _forgotPasswordCodeExpires");
        if (!user) {
            res.status(404).json({ message: "user not found" });
            return;
        }
        res.status(200).json(user);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "failed to fetch user" });
    }
});

router.get("/users", async (req, res) => {
    try {
        const users = await User.find().select("-passwordHash -passwordSalt -refreshToken -verificationCode -verificationCodeExpires -forgotPasswordCode -forgotPasswordCodeExpires")
        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "failed to fetch users" });
    }
});

router.put("/user/:id", upload.single("photo"), async (req, res) => {
    const userId = req.params.id;
    const { fullName,
        phone,
        proffession,
        birthDate,
        gender,
        role,
        serviceIds,
        branchId,
    } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json({ message: "user not found" });
            return;
        }
        if (fullName) user.fullName = fullName;
        if (phone) user.phone = phone;
        if (proffession) user.proffession = proffession;
        if (birthDate) user.birthDate = new Date(birthDate);
        if (gender) user.gender = gender;
        if (role) user.role = role;
        if (serviceIds) user.serviceIds = serviceIds.split(',').map((id: string) => id.trim());
        if (branchId) user.branchId = branchId;

        if (req.file) {
            user.photoUrl = req.file.fieldname;
        }
        await user.save();
        res.status(200).json({ message: "user updated successfull", user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "failed to update users" });
    }
});

router.put("/user/:id/delete", async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId);
        if (!user) {
            res.status(400).json({ message: "user not found" });
            return;
        }
        user.isDeleted = true;
        await user.save();
        res.status(200).json({ message: "user deleted successfull" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "failed to delete user" });
    }
});
export default router;