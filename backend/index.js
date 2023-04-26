const connectToMongo = require("./database");
const express = require("express");
var cors = require('cors')

connectToMongo();

var app = express()
const port = 5001;

app.use(cors())
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(`NoteDown backend listening on port ${port}`);
});
