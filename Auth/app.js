const express = require('express')
const app = express();
const UserRoute = require('./routes/user.route') 
const db = require("./config/database")
const cors = require('cors');

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/users',UserRoute);
db.connect();
app.listen(process.env.APP_PORT);