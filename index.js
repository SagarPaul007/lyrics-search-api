const express = require("express");
const cors = require("cors");

const { getList, getLyrics } = require("./util");

// our app
const app = express();

// CORS policy
const corsOptions = {
  //   origin: "https://vidr-sp.netlify.app",
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
  const links = await getList(name);
  res.send(links);
});

// get lyrics
app.get("/lyrics", async (req, res) => {
  const url = req.query.url.trim();
  const lyrics = await getLyrics(url);
  res.send({ lyrics });
});

app.listen(port, () => {
  console.log("Running ...");
});
