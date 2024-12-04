const fetchPlaylistButton = document.getElementById("fetchPlaylist");
const videoList = document.getElementById("videoList");

fetchPlaylistButton.addEventListener("click", async () => {
  try {
    console.log("Button clicked!");
    const response = await fetch("http://localhost:3000/api/playlist");
    const data = await response.json();

    videoList.innerHTML = "";
    console.log("data.urls:" + data);
    data.urls.forEach((url) => {
      const listItem = document.createElement("li");
      // Create iframe
      const iframe = document.createElement("iframe");
      iframe.src = `https://www.youtube.com/embed/${url}`;
      iframe.width = "560";
      iframe.height = "315";
      iframe.allowFullscreen = true;
      // Append elements
      listItem.appendChild(iframe);
      videoList.appendChild(listItem);
    });
  } catch (error) {
    console.error("Error fetching playlist:", error);
  }
});
