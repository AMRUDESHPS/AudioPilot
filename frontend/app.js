const fetchPlaylistButton = document.getElementById("fetchPlaylist");
const videoList = document.getElementById("videoList");

fetchPlaylistButton.addEventListener("click", async () => {
  try {
    console.log("Button clicked!");
    const response = await fetch("http://localhost:3000/api/playlist");
    const data = await response.json();

    videoList.innerHTML = "";
    data.urls.forEach((url) => {
      const listItem = document.createElement("li");
      const link = document.createElement("a");
      link.href = `http://localhost:9000/api/download?url=${url}`;
      link.textContent = url;
      link.target = "_blank";
      listItem.appendChild(link);
      videoList.appendChild(listItem);
    });
  } catch (error) {
    console.error("Error fetching playlist:", error);
  }
});
