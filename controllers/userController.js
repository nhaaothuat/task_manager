const UserSchema = require("../models/user.model");

const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName) {
    return res
      .status(400)
      .json({ error: true, message: "FullName is required" });
  }

  if (!email) {
    return res.status(400).json({ error: true, message: "Email is required" });
  }

  if (!password) {
    return res
      .status(400)
      .json({ error: true, message: "Password is required" });
  }

  const isUser = await UserSchema.findOne({ email: email });

  if (isUser) {
    return res.json({ error: true, message: "User already exists" });
  }
  const user = new UserSchema({
    fullName,
    email,
    password,
  });

  await user.save();

  const accessToken = jwt.sign({ user }, process.env.SECRET_KEY_JWT, {
    expiresIn: "36000m",
  });

  return res.json({
    error: false,
    user,
    accessToken,
    message: "Registration Successful",
  });
};

const signIn = async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }

  const userInfo = await UserSchema.findOne({ email: email });

  if (!userInfo) {
    return res.status(400).json({ message: "User not found" });
  }

  if (userInfo.email == email && userInfo.password == password) {
    const user = { user: userInfo };
    const accessToken = jwt.sign(user, process.env.SECRET_KEY_JWT, {
      expiresIn: "36000m",
    });

    return res.json({
      error: false,
      message: "Login Successfull",
      email,
      accessToken,
    });
  } else {
    return res.status(400).json({
      error: true,
      message: "Invalid Credentials",
    });
  }
};



// De xem thu cai nay no lam cai gi
const getUser = async (req, res) => {
  const { user } = req.user;

  const isUser = await UserSchema.findOne({ _id: user._id });

  if (!isUser) {
    return res.sendStatus(401);
  }

  return res.json({
    user: {
      fullName: isUser.fullName,
      email: isUser.email,
      _id: isUser._id,
      createOn: isUser.createOn,
    },
    message: "Nice!",
  });
};

module.exports = {
  signIn,
  signUp,
  getUser,
};
