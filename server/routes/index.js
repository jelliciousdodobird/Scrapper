const express = require("express");
const router = express.Router();
const Slot = require("../slot.model");
const Building = require("../building.model");

// router.route("/day=:day/building=:building").get((req, res, next) => {
//   // req.params.day has to send an array (i.e. send M -> ["M"] or send MW -> ["M", "W"])
//   let day = req.params.day.replace(":", "");
//   let building = req.params.building.replace(":", "");
//   // let time = req.params.time;
//   Slot.find(
//     { $and: [{ day: { $all: day } }, { building: building }] },
//     (error, slots) => {
//       if (error) {
//         console.log(error);
//       } else {
//         res.send(slots);
//       }
//     }
//   );
// });

// They're gunna ask for a unique day of the week, and a building to search
// The query returns slots with the day and building
router.route("/day=:day/building=:building").get(async (req, res, next) => {
  let day = req.params.day.replace(":", "");
  let building = req.params.building.replace(":", "");

  let roomSched = new Map();

  let slots;
  let rooms;

  await Building.find({ building: building }, (error, building) => {
    if (error) {
      console.log(error);
    } else {
      rooms = building[0].rooms;
      return rooms;
    }
  });

  // we could do for await (let room of rooms)
  // btw forEach didn't work because apparently, each forEach loop is an individual function so
  // calling await inside doesn't do anything - something about when instead of awaiting
  // the promise, it ends up getting thrown away
  // the callback is called but we aren't waiting for it to be done
  for (let room of rooms) {
    roomSched.set(room, new Set());

    await Slot.find(
      {
        $and: [{ day: { $all: day } }, { building: building }, { room: room }]
      },
      async (error, closedSlots) => {
        if (error) {
          console.log(error);
        } else {
          let classSet = roomSched.get(room);
          classSet.add([...closedSlots]);
        }
      }
    );
  }

  console.log(roomSched);
  console.log(roomSched.get("210"));
});

// in case its easier to simply hold the data on frontend in user space
// computations are based on that though
// so if a slow computer, maybe just straight up request from db/make db do the work?
router.route("/building=:building").get((req, res, next) => {
  let building = req.params.building.replace(":", "");
  Slot.find({ building: building }, (error, slots) => {
    if (error) {
      console.log(error);
    } else {
      // console.log(slots);
      res.send(slots);
    }
  });
});

// router.route("/building=:building/room=:room").get((req, res, next) => {
//   let building = req.params.building.replace(":", "");
//   Slot.find({ building: building }, (error, slots) => {
//     if (error) {
//       console.log(error);
//     } else {
//       // console.log(slots);
//       res.send(slots);
//     }
//   });
// });

module.exports = router;
