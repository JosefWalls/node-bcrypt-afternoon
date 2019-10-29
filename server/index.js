require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const app = express();
const authCtrl = require("./controllers/authController");
const treasureCtrl = require("./controllers/treasureController");
const {CONNECTION_STRING, SESSION_SECRET} = process.env;
const auth = require("./middleware/authMiddleware")



massive(process.env.CONNECTION_STRING)
.then(dbInstance =>{
    app.set("db", dbInstance);
    console.log("db connected")
})
.catch(error => {
    console.log(error)
})

app.use(session({
    resave: true,
    saveUninitialized: false,
    secret: SESSION_SECRET
}))

app.use(express.json());

app.post("/auth/register", authCtrl.register)
app.post("/auth/login", authCtrl.login)
app.get("/auth/logout", authCtrl.logout)


app.get("/api/treasure/dragon", treasureCtrl.dragonTreasure)
app.get("/api/treasure/user", auth.usersOnly, treasureCtrl.getUserTreasure)
app.post("/api/treasure/user",  auth.usersOnly ,treasureCtrl.addMyTreasure)
app.get("/api/treasure/all", auth.usersOnly, auth.adminsOnly ,treasureCtrl.getAllTreasure)

app.listen(4000, () => {
    console.log("Port 4000")
})