const express = require("express");
const router = express.Router();

router.get('/api', (req, res, next) =>{
    res.send("Tasks Api");
});

module.exports = router;