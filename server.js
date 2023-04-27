//TO DO: (1)finnish delete method. (2)set up routs file. (3)deploy to heroku. (4)write readme.

const fs = require("fs/promises");
const express = require("express");
const path = require("path");
const { uid } = require("uid");
const { logger } = require("./middleware/logger");
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use(logger);

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app
.route("/api/notes")
.get( async (req, res) => {
  try {
    data = await fs.readFile("./db/db.json");
    res.json(JSON.parse(data));
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
})
.post( async (req, res) => {
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

app.delete("/api/notes/:id", async (req, res) => {
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

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(PORT, () => {
  console.log(`\x1b[33m App listening on Port: ${PORT}`);
});
