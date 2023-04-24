const connectToMongo = require("./database");
const express = require("express");
connectToMongo();

const app = express();
const port = 5001;

app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
