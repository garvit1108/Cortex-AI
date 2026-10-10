import express from "express";
import { chat } from "../controllers/agent.controller.js";
import multer from "../config/multer.js";



const router =
express.Router();

router.post(
 "/chat",
 multer.single("file"),
 chat
);

export default router;