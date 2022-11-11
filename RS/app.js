process.env.PWD = process.cwd()
const express = require("express");
const path = require("path");

require("./db/conn");

const signupCollection = require("./models/signupModal");
const contactCollection = require("./models/contact");

const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(process.env.PWD + '/public'));

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.post("/login", async (req, res) => {
    let user = await signupCollection.findOne({name: req.body.user});

    if (user == null) {
      user = await signupCollection.findOne({email: req.body.user});
    }
    if(user == null || req.body.key!=user.key) {
        res.redirect("/signin/signup.html");
    } else {
        res.redirect("/");
    }
});

app.post("/signup", async (req, res) => {
    if(req.body.key!=req.body.rkey) {
        res.redirect("/signin/signup.html");
    } else {
        let item = signupCollection(req.body);
        await item.save();
        res.redirect("/");
    }
});

app.post("/contact", async (req, res) => {
    console.log(req.body);
    let item = contactCollection(req.body);
    await item.save();
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Server is running at ${port}`);
  });
  