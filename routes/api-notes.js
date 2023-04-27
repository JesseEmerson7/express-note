const express = require("express");
const {logger} = require("../middleware/logger");
const fs = require('fs/promises')
const { uid } = require("uid");
const router = express.Router();

router
  .route("/notes")
  .get(async (req, res) => {
    try {
      data = await fs.readFile("./db/db.json");
      res.json(JSON.parse(data));
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  })
  .post(async (req, res) => {
    try {
      const data = await fs.readFile("./db/db.json", "utf8");
      const pastTipsArray = JSON.parse(data);

      const { title, text } = req.body;

      const newTip = {
        title,
        text,
        id: uid(),
      };

      pastTipsArray.push(newTip);
      const pastTipsJson = JSON.stringify(pastTipsArray);

      await fs.writeFile("./db/db.json", pastTipsJson, { flag: "w" });
      console.log("Tip posted!");
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  });

router.delete("/notes/:id", async (req, res) => {
  try {
    let deleteId = req.params.id;
    const data = await fs.readFile("./db/db.json");
    const pastTipsArray = JSON.parse(data);
    const deletedIndex = pastTipsArray.findIndex((tip) => tip.id === deleteId);
    pastTipsArray.splice(deletedIndex, 1);
    fs.writeFile("./db/db.json", JSON.stringify(pastTipsArray), { flag: "w" });
    console.log(`Post deleted!`);
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

module.exports = router;
