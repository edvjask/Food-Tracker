require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const {authenticated} = require('./security');

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.on("open", () => console.log("Connected to Database"));

app.use(express.json());

//cors configure
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

const subscribersRouter = require("./routes/subscribers");
app.use("/subscribers", subscribersRouter);


const mealsRouter = require("./routes/plans");
app.use("/plans", mealsRouter);

app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        console.error('Request without valid token');
        res.status(401).send({ msg: 'Invalid token' });
    } else next();
});

app.listen(3001, () => console.log("Server was started"));
