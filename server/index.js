require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

// middlewars
app.use(cors());
app.use(express.json());






app.get("/", (req, res) => {
    res.send("Food is cooking");
});

app.listen(port, () => {
    console.log("Food is cooking");
})