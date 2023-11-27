// User routes

const express = require('express');
const { searchUser, listAllUsers } = require('../Controllers/user.controller.js');
const router = express.Router();

router.post('/search', searchUser);
router.get('/list', listAllUsers);

module.exports = router;