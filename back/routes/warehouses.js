const router = require("express").Router();
const conn = require("../db/dbconnection");
const admin = require("../middleware/admin");
const { body, validationResult } = require("express-validator");
const util = require("util"); // helper

module.exports = router;

// CREATE warehouses  [ADMIN]
router.post(
  "",
  

  body("name")
    .isString()
    .withMessage("please enter a valid Warehouse  name")
    .isLength({ min: 5 })
    .withMessage("Warehouse  name should be at lease 5 characters"),

  body("location")
    .isString()
    .withMessage("please enter a valid location ")
    .isLength({ min: 10 })
    .withMessage("location should be at lease 10 characters"),

  body("status")
    .isString()
    .withMessage("please enter status 0->active, 1->inactive	 "),

  async (req, res) => {
    try {
      // 1- VALIDATION REQUEST [manual, express validation]
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // 3- PREPARE Warehouse OBJECT
      const Warehouse = {
        name: req.body.name,
        location: req.body.location,

        status: req.body.status,
      };

      // 4 - INSERT Warehouse INTO DB
      const query = util.promisify(conn.query).bind(conn);
      await query("insert into 	warehouse set ? ", Warehouse);
      res.status(200).json({
        msg: "Warehouse created successfully !",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);
// UPDATE Warehouse [ADMIN]
router.put(
  "/:id", // params
 

  body("name")
    .isString()
    .withMessage("please enter a valid name Warehouse")
    .isLength({ min: 5 })
    .withMessage(" name should be at lease 10 characters"),

  body("location")
    .isString()
    .withMessage("please enter a valid location ")
    .isLength({ min: 10 })
    .withMessage("location should be at lease 50 characters"),

  body("status")
    .isString()
    .withMessage("please enter status 0->active, 1->inactive	 "),
  async (req, res) => {
    try {
      // 1- VALIDATION REQUEST [manual, express validation]
      const query = util.promisify(conn.query).bind(conn);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // 2- CHECK IF Warehouse EXISTS OR NOT
      const Warehouse = await query("select * from Warehouse where id = ?", [
        req.params.id,
      ]);
      if (!Warehouse[0]) {
        res.status(404).json({ ms: "Warehouse not found !" });
      }

      // 3- PREPARE Warehouse OBJECT
      const WarehouseObj = {
        name: req.body.name,
        location: req.body.location,
        status: req.body.status,
      };

      // 4- UPDATE Warehouse
      await query("update Warehouse set ? where id = ?", [
        WarehouseObj,
        Warehouse[0].id,
      ]);

      res.status(200).json({
        msg: "Warehouse updated successfully",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);
// DELETE Warehouse[ADMIN]
router.delete(
  "/:id", // params
  
  async (req, res) => {
    try {
      // 1- CHECK IF Warehouse EXISTS OR NOT
      const query = util.promisify(conn.query).bind(conn);
      const Warehouse = await query("select * from Warehouse where id = ?", [
        req.params.id,
      ]);
      if (!Warehouse[0]) {
        res.status(404).json({ ms: "Warehouse not found !" });
      }

      await query("delete from Warehouse where id = ?", [Warehouse[0].id]);
      res.status(200).json({
        msg: "Warehouse delete successfully",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);
// get Warehouse by id 
router.get("/:id",async (req, res) => {
  try {
    // 1- FETCH ALL WAREHOUSES WITH THE SPECIFIED ID
    const query = util.promisify(conn.query).bind(conn);
    const warehouses = await query("SELECT * FROM Warehouse WHERE id = ?", [
      req.params.id,
    ]);

    // 2- CHECK IF ANY WAREHOUSE WAS FOUND
    if (warehouses.length === 0) {
      return res.status(404).json({ message: "No warehouses found." });
    }

    // 3- RETURN THE ARRAY OF WAREHOUSES
    return res.status(200).json(warehouses);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Something went wrong." });
  }
});
// get all  Warehouse
//  SEARCH [ADMIN]
router.get("", async (req, res) => {
  const query = util.promisify(conn.query).bind(conn);
  let search = "";
  if (req.query.search) {
    // QUERY PARAMS
    search = `where name LIKE '%${req.query.search}%' or location LIKE '%${req.query.search}%'`;
  }
  const Warehouse = await query(`select * from Warehouse ${search}`);

  res.status(200).json(Warehouse);
});



// approved[ADMIN]
router.put(
  "/approved/:id", // params
  async (req, res) => {
    try {
      // 1- VALIDATION REQUEST [manual, express validation]
      const query = util.promisify(conn.query).bind(conn);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // 2- CHECK IF Warehouse EXISTS OR NOT
      const stockrequest = await query(
        "select * from stockrequest where id = ?",
        [req.params.id]
      );
      if (!stockrequest[0]) {
        res.status(404).json({ ms: "stockrequest not found !" });
      }

      // 3- PREPARE Warehouse OBJECT

      const stockrequestObj = {
        status: "approved",
      };

      // 4- UPDATE stockrequest
      await query("update stockrequest set ? where id = ?", [
        stockrequestObj,
        stockrequest[0].id,
      ]);

      res.status(200).json({
        msg: "stockrequest updated successfully",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);
// declined[ADMIN]
router.put(
  "/declined/:id", // params
  

  async (req, res) => {
    try {
      // 1- VALIDATION REQUEST [manual, express validation]
      const query = util.promisify(conn.query).bind(conn);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // 2- CHECK IF Warehouse EXISTS OR NOT
      const stockrequest = await query(
        "select * from stockrequest where id = ?",
        [req.params.id]
      );
      if (!stockrequest[0]) {
        res.status(404).json({ ms: "stockrequest not found !" });
      }

      // 3- PREPARE Warehouse OBJECT

      const stockrequestObj = {
        status: "declined",
      };

      // 4- UPDATE stockrequest
      await query("update stockrequest set ? where id = ?", [
        stockrequestObj,
        stockrequest[0].id,
      ]);

      res.status(200).json({
        msg: "stockrequest updated successfully",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);
// increac or dec[ADMIN]
router.put(
  "/add/:id/:stock", // params


  async (req, res) => {
    try {
      // 1- VALIDATION REQUEST [manual, express validation]
      const query = util.promisify(conn.query).bind(conn);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // 2- CHECK IF Warehouse EXISTS OR NOT
      const product = await query("select * from product where id = ?", [
        req.params.id,
      ]);
      if (!product[0]) {
        res.status(404).json({ ms: "product not found !" });
      }

      // 3- PREPARE Warehouse OBJECT
      const productObj = {
        stock: parseInt(product[0].stock) + parseInt(req.params.stock),
      };

      // 4- UPDATE Warehouse
      await query("update product set ? where id = ?", [
        productObj,
        product[0].id,
      ]);

      res.status(200).json({
        msg: "product updated successfully",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);




module.exports = router;
