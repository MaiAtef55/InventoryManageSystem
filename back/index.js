const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("upload"));
const cors = require("cors");
app.use(cors());

const auth = require("./routes/auth");
const Add = require("./routes/prodect");
const warehouses = require("./routes/warehouses");
const Supervisor = require("./routes/Supervisor");
const Stockrequest = require("./routes/stockrequest");
const prodect = require("./routes/prodect");

app.listen(4000, "localhost", () => {
  console.log("done");
});

app.use("/auth", auth);
app.use("/Add", Add);
app.use("/prodect", prodect);
app.use("/warehouses", warehouses);
app.use("/Supervisor", Supervisor);
app.use("/Stockrequest", Stockrequest);
