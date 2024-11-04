const router = require("express").Router();
const conn = require("../db/dbconnection");
const { body, validationResult } = require("express-validator");
const util = require("util"); // helper : check imported db
//const fs = require("fs");
const { query } = require("express");
const admin = require("../middleware/admin");
const upload = require("../middleware/uplodeimge");
//add
router.post(
  "",
  upload.single("image"),
  body("name").isString().withMessage("enter the product name"),
  body("description").isString().withMessage("enter the description"),
  body("stock").isInt().withMessage("enter the quantity"),
  body("Warehouseid").isInt().withMessage("enter the Warehouseid"),

  async (req, res) => {
    try {
      // validate req
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // validate img
      if (!req.file) {
        return res.status(400).json({
          errors: [
            {
              msg: "image required ",
            },
          ],
        });
      }

      // prepare obj
      const product = {
        name: req.body.name,
        description: req.body.description,
        url: req.file.originalname,
        stock: req.body.stock,
        Warehouseid: req.body.Warehouseid,
      };

      // insert
      const query = util.promisify(conn.query).bind(conn);
      await query("insert into product set ?", product);
      res.status(200).json({
        msg: "product added successfully ",
      });
    } catch (err) {
      console.log(err);
    }
  }
);

//ReturnAll

router.get("", async (req, res) => {
  const query = util.promisify(conn.query).bind(conn);
  const productModel = await query("select * from product ");
  productModel.map((product) => {
    product.image_url = "http://" + req.hostname + ":4000/" + product.url;
  });

  res.status(200).json(productModel);
});
//Return by Warehouse id
router.get("/:id", async (req, res) => {
  const query = util.promisify(conn.query).bind(conn);
  const productModel = await query(
    "SELECT * FROM product WHERE Warehouseid = ?",
    [req.params.id]
  );
  if (productModel.length === 0) {
    res.status(404).json({
      msg: "Product not found!",
    });
  } else {
    productModel.forEach((product) => {
      product.image_url = "http://" + req.hostname + ":4000/" + product.url;
    });
    res.status(200).json(productModel);
  }
});
//Return by Warehouseid 
router.get("/search/:id", async (req, res) => {
  const query = util.promisify(conn.query).bind(conn);
  let search = req.params.id;

  if (req.query.search) {
    // QUERY PARAMS
    search = `where Warehouseid LIKE '%${req.query.search}%'`;
  }
  const Warehouse = await query(
    "select * from product  where Warehouseid = ?",
    [req.params.id]
  );

  res.status(200).json(Warehouse);
});
//Return by id 
router.get("/git/:id", async (req, res) => {
  const query = util.promisify(conn.query).bind(conn);
  let search = req.params.id;

  if (req.query.search) {
    // QUERY PARAMS
    search = `where id LIKE '%${req.query.search}%'`;
  }
  const Warehouse = await query(
    "select * from product  where id = ?",
    [req.params.id]
  );

  res.status(200).json(Warehouse);
});

/*

  // check exist
  if (!product[0]) {
    res.status(404).json({
      msg: " not found !",
    });
  }
  product[0].image_url =
    "http://" + req.hostname + ":4000/" + product[0].image_url;
  res.status(200).json(product[0]);
});
*/
//Update

router.put(
  "/:id", // params
  body("name").isString().withMessage("enter the product name"),
  body("description").isString().withMessage("enter the description"),
  body("stock").isInt().withMessage("enter the quantity"),
  body("Warehouseid").isInt().withMessage("enter the Warehouseid"),
  async (req, res) => {
    try {
      // validate req
      const query = util.promisify(conn.query).bind(conn);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // check if exist
      const productModel = await query(
        "select *  from  product where id  = ?",
        [req.params.id]
      );
      if (!productModel[0]) {
        res.status(404).json({
          msg: " not found !",
        });
      }

      // prepare
      const productObj = {
        name: req.body.name,
        description: req.body.description,
        stock: req.body.stock,
        Warehouseid: req.body.Warehouseid,
      };

      const product = {
        name: req.body.name,
        description: req.body.description,
       
        stock: req.body.stock,
        Warehouseid: req.body.Warehouseid,
      };

      // update
      await query("update product set ? where id = ? ", [
        product,
        productModel[0].id,
      ]);

      res.status(200).json({
        msg: "updated successfully",
      });
    } catch {}
  }
);

//delete
router.delete(
  "/:id", // params

  async (req, res) => {
    try {
      // 1- CHECK IF product EXISTS OR NOT
      const query = util.promisify(conn.query).bind(conn);
      const product = await query("select * from product where id = ?", [
        req.params.id,
      ]);
      if (!product[0]) {
        res.status(404).json({ ms: "product not found !" });
      }

      await query("delete from product where id = ?", [product[0].id]);
      res.status(200).json({
        msg: " delete successfully",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

module.exports = router;
