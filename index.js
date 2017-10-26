const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const massive = require("massive");
const app = express();
app.use(bodyParser.json());
app.use(cors());

massive(process.env.CONNECTION_STRING)
  .then(dbInstance => {
    console.log(dbInstance);
    app.set("db", dbInstance);
  })
  .catch(console.log);

app.get("/api/airplanes/:id", (req, res) => {
  const db = req.app.get("db");
  db
    .get_planes([req.params.id])
    .then(response => {
      return res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
