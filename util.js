const axios = require("axios");
const cheerio = require("cheerio");

const getList = async (name) => {
  let URL = "https://www.musixmatch.com";
  let links = [];
  await axios.get(`${URL}/search/${name}`).then(async (res) => {
    const $ = await cheerio.load(res.data);

    $(".media-card-text").each(async (index, item) => {
      const rawLink = $(item)
        .children(".media-card-title")
        .children("a")
        .attr("href");
      const link = `${URL}${rawLink}`;
      const title = $(item).children("h2").text();
      const subtitle = $(item).children("h3").text();
      links[index] = { title, subtitle, link };
    });
  });

  return links;
};

const getLyrics = async (link) => {
  let lyrics = "";
  await axios.get(link).then(async (res) => {
    const $ = await cheerio.load(res.data);

    $(".mxm-lyrics__content").each(async (index, item) => {
      const lyricsItem = $(item).children("span").text();
      lyrics += lyricsItem;
      lyrics += "/n";
    });
  });

  return lyrics;
};

module.exports = { getLyrics, getList };
