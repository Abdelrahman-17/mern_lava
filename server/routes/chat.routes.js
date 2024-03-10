const express = require("express");
const { add_chat, chatsData, clear_chat } = require("../controllers/chat.controller");

const router = express.Router();

router.post('/add-chat', add_chat);
router.post('/chatsData', chatsData);
router.post('/clear-chat', clear_chat);

module.exports = router