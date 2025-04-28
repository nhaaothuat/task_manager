const express = require("express");
require("dotenv").config();
const cors = require("cors");
const userRoutes = require("./routes/user");
const noteRoutes = require("./routes/note");
const { authenticateToken } = require("./utilities");

const mongoose = require("mongoose");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use("/users",userRoutes);
app.use("/note", authenticateToken, noteRoutes);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server on listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
