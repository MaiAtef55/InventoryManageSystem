const router = require("express").Router();
const conn = require("../db/dbconnection");
const athouriez = require("../middleware/athouriez");
const { body, validationResult } = require("express-validator");
const util = require("util"); // helper

module.exports = router;

// CREATE stockrequest  [ADMIN]
router.post(
  "",

  body("quantity").isString().withMessage("please enter quantity	 "),

  async (req, res) => {
    try {
      // 1- VALIDATION REQUEST [manual, express validation]
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // 3- PREPARE stockrequest OBJECT
      const stockrequest = {
        supervisorid: req.body.supervisorid,
        warehouseid: req.body.warehouseid,
        productid: req.body.productid,
        quantity: req.body.quantity,
      };

      // 4 - INSERT stockrequest INTO DB
      const query = util.promisify(conn.query).bind(conn);
      await query("insert into 	stockrequest set ? ", stockrequest);
      res.status(200).json({
        msg: "stockrequest created successfully !",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);
