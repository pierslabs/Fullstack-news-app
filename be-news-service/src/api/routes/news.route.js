const router = require("express").Router();
const { body } = require("express-validator");

const { bodyValidatior, paramValidator } = require("../helpers/validation.js");
const {
  getNews,
  createNew,
  seedNews,
  archiveNew,
  updateNew,
  deleteNew,
} = require("../controllers/news.controller.js");
router.get("/", (req, res) => res.send("hola"));
router.get("/news", getNews);
router.get("/news/seed", seedNews);
router.post("/news", bodyValidatior, createNew);
router.patch("/news/:id", paramValidator, archiveNew);
router.put("/news/:id", bodyValidatior, paramValidator, updateNew);
router.delete("/news/:id", paramValidator, deleteNew);

module.exports = router;
