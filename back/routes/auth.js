const router =require("express").Router();

const conn = require("../db/dbconnection");
const { body, validationResult } = require("express-validator");
const util = require("util"); // helper
const bcrypt = require("bcrypt");


//[LOGIN
router.post(
  "/login",
  body("email").isEmail().withMessage("please enter a valid email!"),
  body("password")
    .isLength({ min: 8, max: 12 })
    .withMessage("password should be between (8-12) character"),
  async (req, res) => {
    try {
      // 1- VALIDATION REQUEST [manual, express validation]
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // 2- CHECK IF EMAIL EXISTS
      const query = util.promisify(conn.query).bind(conn); // transform query mysql --> promise to use [await/async]
      const user = await query("select * from 	user where email = ?", [
        req.body.email,
      ]);
      if (user.length == 0) {
        res.status(404).json({
          errors: [
            {
              msg: "email or password not found !",
            },
          ],
        });
      }

      // 3- COMPARE HASHED PASSWORD
      const checkPassword = await bcrypt.compare(
        req.body.password,
        user[0].password
      );
      if (checkPassword) {
        delete user[0].password;
        res.status(200).json(user[0]);
      } else {
        res.status(404).json({
          errors: [
            {
              msg: "email or password not found !",
            },
          ],
        });
      }
    } catch (err) {
      // Log the error to your server logs for debugging purposes
      console.error(err);
    
      // Check if the error is a MySQL error caused by an invalid query
      if (err.code === 'ER_PARSE_ERROR') {
        return res.status(500).json({
          errors: [
            {
              msg: 'Invalid query. Please try again later.',
            },
          ],
        });
      }
    
      // Check if the error is a bcrypt error caused by an invalid password hash
      if (err.name === 'bcryptjs' && err.message === 'invalid salt') {
        return res.status(500).json({
          errors: [
            {
              msg: 'Internal server error. Please try again later.',
            },
          ],
        });
      }
    
      // Return a generic error response for any other types of errors
      return res.status(500).json({
        errors: [
          {
            msg: 'Internal server error. Please try again later.',
          },
        ],
      });
    }
  }
);



module.exports = router;
