const express = require("express");
require("dotenv").config();

const PORT = process.env.PORT || 9000;

const app = express();
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

app.get("/", async (req, res, next) => {
  const playlistId = "PLO7-VO1D0_6M1xUjj8HxTxskouWx48SNw";
  const youtubeApiUrl = `https://www.googleapis.com/youtube/v3/playlistItems?key=${YOUTUBE_API_KEY}&playlistId=${playlistId}&type=video&part=snippet&maxResults=10`;

  try {
    const response = await axios.get(youtubeApiUrl);
    const videoUrls = response.data.items.map((item) => {
      const videoId = item.snippet.resourceId.videoId;
      // console.log(videoId);
      return `https://www.youtube.com/watch?v=${videoId}`;
    });
    // console.log(videoUrls);
    res.json({ urls: videoUrls });
  } catch (err) {
    console.error("Error while fetching playlist items:", err);
    res.status(500).json({ err: "Failed to fetch playlist items" });
  }
});

app.listen(3000, () => {
  console.log(`Server running on port ${PORT}`);
});
