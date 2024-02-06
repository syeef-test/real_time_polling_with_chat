const express = require("express");

const app = express();
const path = require("path");

const PORT = process.env.PORT || 3000;

app.use((req, res) => {
  //console.log(req.url);
  res.sendFile(path.join(__dirname, `./public/${req.url}`));
});

app.listen(PORT, () => {
  console.log(`Server is runing on ${PORT}`);
});
