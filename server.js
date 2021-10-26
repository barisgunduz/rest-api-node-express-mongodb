require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");

// DB Connection
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("connected to db"));

// JSON
app.use(express.json());

// Routes
const subscribersRouter = require("./routes/subscribers");
const usersRouter = require("./routes/users");

app.use("/subscribers", subscribersRouter);
app.use("/users", usersRouter);

app.listen(3000, () => console.log("Server started"));
