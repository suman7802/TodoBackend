require("dotenv").config();

const cors = require("cors");
const express = require("express");
const parser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const path = require("path");

const connectDB = require("./database/db");
const userRouter = require("./routes/user.route");
const todoRouter = require("./routes/todo.route");
const validateToken = require("./middleware/validateToken");

const app = express();

app.use(parser.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
    exposedHeaders: ["set-cookie"],
  })
);

app.use("/api/user", userRouter);
app.use("/api/todo", validateToken, todoRouter);
app.use(express.static(path.join(__dirname, "build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

async function startServer() {
  connectDB();
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
}
startServer();
