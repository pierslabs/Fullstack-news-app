const router = require("express").Router();

router.use("/api/v1", require("./news.route.js"));

module.exports = router;
