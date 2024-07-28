const express = require("express");
const router = express.Router();

router.get('/', (req, res, next)=> {
    console.log(req.url);
    console.log(req.method);
    res.send("I am home route")
})

module.exports = router