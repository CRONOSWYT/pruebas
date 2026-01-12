// ===============================
// REPRODUCTOR DE VIDEO
// ===============================

const playerVideo = document.getElementById("player-video");
const params = new URLSearchParams(window.location.search);
const currentVideoId = parseInt(params.get("id"));

// Obtener video actual
const currentVideo = videos.find(v => v.id === currentVideoId);

if (!currentVideo) {
    document.body.innerHTML = "<p style='padding: 20px; color: #aaa;'>Error: Video no encontrado</p>";
} else {
    // Cargar información del video
    playerVideo.src = currentVideo.src;
    document.getElementById("title").textContent = currentVideo.title;
    document.getElementById("author").textContent = "Por " + currentVideo.author;

    // Cargar playlist (sugerencias de otros videos)
    loadRelatedVideos();
}

function loadRelatedVideos() {
    const playlistSide = document.getElementById("playlist-side");
    playlistSide.innerHTML = "<h3>Más videos</h3>";

    videos.forEach(v => {
        if (v.id !== currentVideoId) {
            const item = document.createElement("div");
            item.className = "playlist-item";
            item.innerHTML = `
                <img src="${v.thumbnail}" alt="${v.title}" class="playlist-thumbnail">
                <div class="playlist-info">
                    <p class="playlist-title">${v.title}</p>
                    <p class="playlist-author">${v.author}</p>
                </div>
            `;
            item.addEventListener("click", () => {
                window.location.href = `video.html?id=${v.id}`;
            });
            playlistSide.appendChild(item);
        }
    });
}

// Autoplay del siguiente video
playerVideo.addEventListener("ended", () => {
    const nextIndex = videos.findIndex(v => v.id === currentVideoId) + 1;
    if (nextIndex < videos.length) {
        window.location.href = `video.html?id=${videos[nextIndex].id}`;
    }
});
