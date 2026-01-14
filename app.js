const express = require("express");
const app = express();
const cookie = require("cookie-parser");
const path = require("path");
const cookieParser = require("cookie-parser");

const ownersRouter = require("./routes/ownersRouter");
const productsRouter = require("./routes/productsRouter");
const usersRouter = require("./routes/usersRouter");
const index = require("./routes/index");

require("dotenv").config();
const expressSession = require("express-session");
const port = 3000;

const flash = require("connect-flash");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookie());
app.set("view engine", "ejs");
app.use(flash());
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.JWT_KEY || "ansdvbahdbaogfbwrnjo",
  })
);

const db = require("./config/mongoose-connection");

app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/", index);
app.use("/signin", index);
app.use("/shop", index);

app.listen(port);
