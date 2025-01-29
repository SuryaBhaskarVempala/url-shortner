const express = require('express');
const {connectionDB} = require('./connection');
const router = require('./routes/url');
const userRouter = require('./routes/user');
const {restriction,checkAuth} = require('./middleware/auth');
const staticRouter = require('./routes/staticRouter');
const URL = require('./model/url');
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(restriction);

connectionDB('mongodb://localhost:27017/short-url')
    .then(() => {
        console.log("MongoDb connected");
    })
    .catch((err) => {
        console.log(err, "Some issue with database");
    });

app.use('/user',userRouter);

// URL routes
app.use('/url',checkAuth(['USER','ADMIN']),router);

// Static pages
app.use('/',staticRouter);


app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Get URL by shortId and update visit history
app.get('/url/:id', async (req, res) => {
    const id = req.params.id;
    console.log("params : id" + id);

    const entry = await URL.findOneAndUpdate(
        { shortId: id },
        { $push: { visitHistory: { timestamp: Date.now() } } }
    );

    if (entry) {
        return res.redirect(entry.redirectUrl);
    }

    if (!res.headersSent) {
        return res.json({ error: "error in db check get/:id api in routes" });
    }
});

app.listen(4000, () => {
    console.log("Server started at 4000");
});
