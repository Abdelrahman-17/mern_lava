import express from "express";
import { register, login, userData, forgot_password, reset_password_id_token_get, getAllUsers, deleteUser, upload_image, get_image, logout, getAllUsers_no_admin, getAdmin, update_user_data, verify, reset_password_id_token_post } from "../controllers/auth.controller.js";
const router = express.Router();

// router.get("*", async (req, res) => {
//     try {
//         const clientURL = req.headers.host
//         if (clientURL.includes('localhost')) {
//             console.log('react')
//         }
//         else {
//             console.log('fluter')
//         }
//     } catch (error) {
//         console.log(error.message);
//     }

// });
router.post("/register", register);
router.post("/login", login);
router.post("/userData", userData);
router.get("/verify/:token", verify);
router.post("/forgot-password", forgot_password);
router.get("/reset-password/:id/:token", reset_password_id_token_get);
router.post("/reset-password/:id/:token", reset_password_id_token_post);
router.get('/getAllUsers', getAllUsers);
router.get('/getAllUsers-no-admin', getAllUsers_no_admin);
router.get('/getAdmin', getAdmin);
router.post('/deleteUser', deleteUser);
router.post('/upload-image', upload_image);
router.post('/get-image', get_image);
router.get('/logout', logout);
router.post('/update-user-data', update_user_data);

export default router