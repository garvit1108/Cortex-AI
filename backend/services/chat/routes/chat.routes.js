import express from "express";
import { createConversation, getConversations, getMessages, saveMessage, updateConversation } from "../controllers/chat.controller.js";



const router =
express.Router();

router.post("/create-conversation",createConversation);
router.get("/get-conversations",getConversations);
router.post("/update-conversation",updateConversation);
router.post("/save-message",saveMessage);
router.get("/get-messages/:id",getMessages);

export default router;