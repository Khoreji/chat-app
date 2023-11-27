const express = require('express');
const { sendMessage, listAllMessages, fileUploadController } = require('../Controllers/message.controller.js');
const router = express.Router();

router.post('/send', sendMessage);
router.post('/list', listAllMessages);

module.exports = router;