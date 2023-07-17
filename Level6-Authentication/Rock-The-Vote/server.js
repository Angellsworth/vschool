const express = require("express");
const app = express();
require("dotenv").config(); //lets the app know to use dotenv
const morgan = require("morgan");
const mongoose = require("mongoose");

app.use(express.json());
app.use(morgan("dev"));

mongoose.set("strictQuery", false);

mongoose.connect(process.env.MONGO_URL, () =>
  console.log("Connected to the DB")
);

//For login and signup
app.use("/auth", require("./routes/authRouter.js"));

app.use("/api/todo", require("./routes/todoRouter.js"));

//Error handler to catch errors in login
app.use((err, req, res, next) => {
  console.log(err);
  if (err.name === "UnauthorizedError") {
    res.status(err.status);
  }
  return res.send({ errMsg: err.message });
});

app.listen(9000, () => {
  console.log(`The Server is ROCKING on local port 9000`);
});
