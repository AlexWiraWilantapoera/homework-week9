/**
 * @swagger
 * components:
 *  schemas:
 *    Login:
 *      type: object
 *      required:
 *        - email
 *        - password
 *      properties:
 *        email:
 *          type: string
 *          description: The email of a user used for generating token
 *        password:
 *          type: string
 *          description: The password of a user used for generating token
 *      example:
 *        email: oainger0@craigslist.org
 *        password: KcAk6Mrg7DRM
 */

/**
 * @swagger
 * tags:
 *  name: Login
 *  description: Get a token used for authenticate and authorize a user
 * /login:
 *  post:
 *    summary: Generated a token for a user
 *    tags: [Login]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Login'
 *    response:
 *      200:
 *        description: Token generated.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Login'
 *      500:
 *        description: Some server error
 */

require("dotenv").config();

const express = require("express");
const router = express.Router();
const pool = require("../queries.js");

const bodyParser = require("body-parser");

const jwt = require("jsonwebtoken");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post("/", (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.send({ message: "Bad Request" });
  }
  const token = jwt.sign(
    {
      emali: req.body.email,
      password: req.body.password,
    },
    "koderahasia",
    { expiresIn: "30s" }
  );
  res.json({
    token: token,
  });
});

module.exports = router;
