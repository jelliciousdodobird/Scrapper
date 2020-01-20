const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const fetchData = require("./scrapper");
const Slot = require("./slot.model");
const Building = require("./building.model");
// const Rooms = require("./room.model");
const router = require("./routes/index");
// const router = express.Router();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = 3001;
const server = "localhost:27017";
const database = "slots";

mongoose.connect(`mongodb://${server}/${database}`, { useNewUrlParser: true });

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB Database connection open.");
});

app.get("/ResetDB", async (req, res, next) => {
  const values = await fetchData();
  const schedules = values[0];
  const buildings = values[1];

  schedules.forEach(async record => {
    let slot = new Slot(record);
    await slot
      .save()
      .then(document => console.log(document))
      .catch(error => res.status(400).send("Slot insert failed."));
  });

  buildings.forEach(async (value, key) => {
    console.log(key);
    console.log(value);
    let building = new Building({ building: key, rooms: [...value] });
    console.log(building);
    await building
      .save()
      .then(document => console.log(document))
      .catch(error => res.status(400).send("Building insert failed"));
  });

  // res.json(schedules);
});

app.use("/", router);

// router.get("/", async (req, res, next) => {
//   const schedules = await fetchData();
//   res.json(schedules);
// });

// app.use("/", router);

app.listen(port, () => {
  console.log(`App listening on port ${port}.`);
});
