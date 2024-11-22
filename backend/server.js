const express = require("express");
const ytdl = require("ytdl-core");
const axios = require("axios");
require("dotenv").config({ path: "../.env" });

const PORT = process.env.PORT || 3000;
const app = express();
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

// Enable CORS for communication with frontend
const cors = require("cors");
app.use(cors());
app.get("/", (req, res, next)=>{res.send("hello")} )
// Fetch YouTube Playlist URLs
app.get("/api/playlist", async (req, res) => {
  const playlistId = "PLxA687tYuMWhkqYjvAGtW_heiEL4Hk_Lx";
  const youtubeApiUrl = `https://www.googleapis.com/youtube/v3/playlistItems?key=${YOUTUBE_API_KEY}&playlistId=${playlistId}&type=video&part=snippet&maxResults=10`;
  console.log("Fetching data from googleapis");
  
  try {
    const response = await axios.get(youtubeApiUrl);
    const videoUrls = response.data.items.map((item) => {
      const videoId = item.snippet.resourceId.videoId;
      return `https://www.youtube.com/watch?v=${videoId}`;
    });
    res.json({ urls: videoUrls });
  } catch (err) {
    console.error("Error fetching playlist items:", err);
    res.status(500).json({ error: "Failed to fetch playlist items" });
  }
});

// Download YouTube Video
app.get("/api/download", async (req, res) => {
  const videoUrl = req.query.url;

  if (!ytdl.validateURL(videoUrl)) {
    return res.status(400).json({ error: "Invalid YouTube URL" });
  }

  try {
    const info = await ytdl.getInfo(videoUrl);
    const title = info.videoDetails.title.replace(/[^\w\s]/gi, ""); // Sanitize title

    res.header("Content-Disposition", `attachment; filename="${title}.mp3"`);

    ytdl(videoUrl, { quality: "highestaudio" }).pipe(res).on("finish", () => {
      console.log("Download complete");
    });
  } catch (error) {
    console.error("Error downloading audio:", error);
    res.status(500).json({ error: "Failed to download audio" });
  }
});

app.listen(3000, () => {
  console.log(`Server running on port ${PORT}`);
});
