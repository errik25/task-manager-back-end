const express = require("express");
const router = express.Router();
let auth = require("../middleware/auth");
const { User } = require("../initDB");
const { Op } = require("sequelize");

router.get("/profile", auth, async function (req, res) {

});

module.exports = router;
