require("dotenv").config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const connectDb = require("./config/dbConnect");
const corsOptions = require("./config/corsOptions");


const port = process.env.PORT || "33550";

connectDb();
const app = express();

app.use(cors(corsOptions));

mongoose.connection.once("open", () => {
    console.log("connected to Database");
    app.listen(port, () => console.log(`Server running on port ${port}`));
})

