const express = require("express");
const { signIn, signUp, getUser } = require("../controllers/userController");
const { authenticateToken } = require("../utilities");
const router = express.Router();

router.post("/signin", signIn);
router.post("/signup", signUp);
router.get("/getalluser", authenticateToken, getUser);

module.exports = router;
