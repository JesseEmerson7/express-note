//imported modules
const fs = require("fs/promises");
const express = require("express");
const path = require("path");
const { logger } = require("./middleware/logger");
const api = require("./routes/api-notes");

const PORT = process.env.PORT || 3001;
const app = express();

//middleware
app.use(express.json());
app.use(express.static("public"));
app.use(logger);
app.use("/api", api);

//HomePage routing and notes page. *all api/routes methods are in routes/api-notes.js file*
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(PORT, () => {
  console.log(`\x1b[33m App listening on Port: ${PORT}`);
});
