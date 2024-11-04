const router = require("express").Router();
const admin = require("../middleware/admin");
const conn = require("../db/dbconnection");
const { body, validationResult } = require("express-validator");
const util = require("util"); // helper
const bcrypt = require("bcrypt");
const crypto = require("crypto");

router.post(
  "",
  body("email").isEmail().withMessage("please enter a valid email!"),
  body("name")
    .isString()
    .withMessage("please enter a valid name")
    .isLength({ min: 10, max: 20 })
    .withMessage("name should be between (10-20) character"),
  body("status").isString().withMessage("please enter a valid status"),
  body("Warehouseid").isString().withMessage("please enter  Warehouse id "),
  body("type").isString().withMessage("please enter a valid type"),
  body("phone").isString().withMessage("please enter a   phone"),
  body("password")
    .isLength({ min: 8, max: 12 })
    .withMessage("password should be between (8-12) character"),

  async (req, res) => {
    try {
      // validation
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // check if email already exists
      const query = util.promisify(conn.query).bind(conn);
      const checkEmailExists = await query(
        "select * from user where email = ?  ",
        [req.body.email]
      );
      if (checkEmailExists.length > 0) {
        res.status(400).json({
          errors: [{ msg: "email already exists" }],
        });
      } else {
        // prepare obj
        const userData = {
          name: req.body.name,
          email: req.body.email,
          password: await bcrypt.hash(req.body.password, 10),
          type: req.body.type,
          Warehouseid: req.body.Warehouseid,
          status: req.body.status,
          phone: req.body.phone,
          token: crypto.randomBytes(16).toString("hex"),
        };
        // insert
        await query("insert into user set ?", userData);
        delete userData.password;
        res.status(200).json(userData);
      }
    } catch (err) {
      // console.log(err)
      // res.status(500).json({err : err });
    }
  }
);

// UPDATE
router.put(
  "/:id", // params

  body("name")
    .isString()
    .withMessage("please enter a valid name ")
    .isLength({ min: 5 })
    .withMessage("name should be at lease 10 characters"),

  body("phone"),
  body("type"),
  body("status"),
  async (req, res) => {
    try {
      // 1- VALIDATION REQUEST [manual, express validation]
      const query = util.promisify(conn.query).bind(conn);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // 2- CHECK IF EXISTS OR NOT
      const user = await query("select * from user where id = ?", [
        req.params.id,
      ]);
      if (!user[0]) {
        res.status(404).json({ ms: "user not found !" });
      }

      // 3- PREPARE  OBJECT
      const userObj = {
        name: req.body.name,
        status: req.body.status,
        type: req.body.type,

        phone: req.body.phone,

        //password: req.body.password,
        //phone: req.body.phone
      };

      // 4- UPDATE
      await query("update user set ? where id = ?", [userObj, user[0].id]);

      res.status(200).json({
        msg: "user updated successfully",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

// DELETE
router.delete(
  "/:id", // params

  async (req, res) => {
    try {
      // 1- CHECK IF MOVIE EXISTS OR NOT
      const query = util.promisify(conn.query).bind(conn);
      const user = await query("select * from user where id = ?", [
        req.params.id,
      ]);
      if (!user[0]) {
        res.status(404).json({ ms: "user not found !" });
      }

      await query("delete from user where id = ?", [user[0].id]);
      res.status(200).json({
        msg: " delete successfully",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);
// LIST of supervisor
router.get("", async (req, res) => {
  const query = util.promisify(conn.query).bind(conn);
  let search = "";
  if (req.query.search) {
    // QUERY PARAMS
    search = `where type LIKE '%${req.query.search}%' `;
  }
  const user = await query(`select * from user ${search}`);

  res.status(200).json(user);
});

// git  supervisor by ID
router.get(
  "/Define/:id", // params

  async (req, res) => {
    try {
      // 1- CHECK IF user EXISTS OR NOT
      const query = util.promisify(conn.query).bind(conn);
      const user = await query("select * from user where id = ?", [
        req.params.id,
      ]);
      if (!user[0]) {
        res.status(404).json({ ms: "user not found !" });
      }
      res.status(200).json(user[0]);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);
// git  req  by supervisor_id
router.get(
  "/stockrequest/:id", // params
  admin,
  async (req, res) => {
    try {
      // 1- CHECK IF stockrequest EXISTS OR NOT
      const query = util.promisify(conn.query).bind(conn);
      const Warehouse = await query(
        "select * from stockrequest  where 	supervisor_id = ?",
        [req.params.id]
      );
      if (!Warehouse[0]) {
        res.status(404).json({ ms: "stockrequest  not found !" });
      }
      res.status(200).json(Warehouse[0]);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);
// git  req  by productid
router.get(
  "/stockrequest/:id", // params

  async (req, res) => {
    try {
      // 1- CHECK IF user EXISTS OR NOT
      const query = util.promisify(conn.query).bind(conn);
      const user = await query(
        "select * from stockrequest where productid = ?",
        [req.params.id]
      );
      if (!user[0]) {
        res.status(404).json({ ms: "stockrequest not found !" });
      }
      res.status(200).json(user[0]);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

//StockRequest is not supmiut
router.get("/StockRequest-req", async (req, res) => {
  const query = util.promisify(conn.query).bind(conn);
  let search = "";
  if (req.query.search) {
    search = `WHERE id LIKE '%${req.query.search}%' OR id LIKE '%${req.query.search}%'`;
  }

  // Add WHERE clause to filter by status
  const statusFilter = `WHERE status = 'pending'`;

  const stockrequest = await query(
    `SELECT * FROM stockrequest ${statusFilter} ${search}`
  );

  res.status(200).json(stockrequest);
});

//StockRequest is supmiut
router.get("/StockRequest-history", async (req, res) => {
  const query = util.promisify(conn.query).bind(conn);
  let search = "";
  if (req.query.search) {
    search = `WHERE StockRequest-id LIKE '%${req.query.search}%' OR StockRequest-id LIKE '%${req.query.search}%'`;
  }

  // Add WHERE clause to filter by status
  const statusFilter = `WHERE status != 'pending'`;

  const stockrequest = await query(
    `SELECT * FROM stockrequest ${statusFilter} ${search}`
  );

  res.status(200).json(stockrequest);
});
//StockRequest by id
router.get("/search/:id", async (req, res) => {
  const query = util.promisify(conn.query).bind(conn);
  let search = req.params.id;
  if (req.query.search) {
    // QUERY PARAMS
    search = `where supervisorid LIKE '%${req.query.search}%'`;
  }
  const Warehouse = await query(
    "select * from stockrequest  where supervisorid = ?",
    [req.params.id]
  );
  res.status(200).json(Warehouse);
});

module.exports = router;
