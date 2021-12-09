const express = require("express");
const cors = require("cors");

const { getList, getLyrics } = require("./util");

// our app
const app = express();

// CORS policy
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.static("./static"));
const port = process.env.PORT || 3001; // default port

// pages

// index page
app.get("/", (res) => {
  res.render("index.html");
});

// get links
app.get("/search", async (req, res) => {
  const name = req.query.name;
  try {
    const links = await getList(name);
    res.send(links);
    console.log(links);
  } catch (err) {
    res.status(404);
    res.send({
      error: err.message,
      fix: "Please check the name of your song",
    });
  }
});

// get lyrics
app.get("/lyrics", async (req, res) => {
  const url = req.query.url.trim();
  try {
    const lyrics = await getLyrics(url);
    res.send({ lyrics });
    console.log(lyrics);
  } catch (err) {
    res.status(404);
    res.send({
      error: err.message,
      fix: "Please check the url",
    });
  }
});

app.listen(port, () => {
  console.log("Running ...");
});
