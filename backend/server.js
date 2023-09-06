require("dotenv").config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const connectDb = require("./config/dbConnect");
const corsOptions = require("./config/corsOptions");
const { logger } = require("./middleware/logEvent");
const verifyJWT = require('./middleware/verifyJWT');

const port = process.env.PORT || "33550";

connectDb();
const app = express();

app.use(cors(corsOptions));

app.use(logger);
app.use(cookieParser());
app.use(express.json());


//routes non protected by jwt:
app.use('/login', require('./routes/login'))
app.use('/register', require('./routes/registerRoutes'));

//routes protected by jwt verification
app.use(verifyJWT());
app.use('/user', require('./routes/userRoutes'));
app.use('/campaign', require('./routes/campaignRoutes'));

mongoose.connection.once("open", () => {
    console.log("connected to Database");
    app.listen(port, () => console.log(`Server running on port ${port}`));
})

