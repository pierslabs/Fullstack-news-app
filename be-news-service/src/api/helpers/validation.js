const { body, param } = require("express-validator");

const bodyValidatior = [
  body("title").isString().isLength({ min: 2, max: 150 }),
  body("author").isString().isLength({ min: 2, max: 50 }),
  body("description").isString().isLength({ min: 2, max: 250 }),
  body("archiveDate").optional().isDate(),
  body("content").isString(),
];

const paramValidator = [param("id").isMongoId()];

module.exports = { bodyValidatior, paramValidator };
