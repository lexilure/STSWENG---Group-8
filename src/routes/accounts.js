import express from "express";
import { register, login, getAllAccounts, deleteAccount } from "../controllers/accounts.js"


const router = express.Router();

//REGISTER
router.post("/register", register);

//LOGIN
router.post("/login", login);

//GET ALL
router.get("/getallaccounts", getAllAccounts);

//GET ALL
router.delete("/deleteaccount", deleteAccount);

export default router