// ===============================
// SISTEMA DE PLAYLISTS
// ===============================

function renderPlaylists() {
    const container = document.getElementById("playlists-container");
    if (!container) return;
    
    container.innerHTML = "";

    if (playlists.length === 0) {
        container.innerHTML = "<p style='color: #aaa;'>No hay playlists disponibles</p>";
        return;
    }

    playlists.forEach(playlist => {
        const playlistVideos = videos.filter(v => playlist.videos.includes(v.id));
        const thumbnail = playlistVideos[0]?.thumbnail || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect fill='%23313131' width='100' height='100'/%3E%3C/svg%3E";
        
        const html = `
            <div class="playlist-card" data-playlist-id="${playlist.id}" style="cursor: pointer;">
                <div class="playlist-thumbnail">
                    <img src="${thumbnail}" alt="${playlist.title}">
                    <div class="playlist-badge">${playlistVideos.length} videos</div>
                    <div class="playlist-overlay">▶</div>
                </div>
                <h3>${playlist.title}</h3>
                <p>${playlist.description || ''}</p>
            </div>
        `;
        container.innerHTML += html;
    });

    // Agregar event listeners a las playlists
    document.querySelectorAll(".playlist-card").forEach(card => {
        card.addEventListener("click", () => {
            const playlistId = parseInt(card.dataset.playlistId);
            window.location.href = `playlist.html?id=${playlistId}`;
        });
    });
}

function openPlaylist(playlistId) {
    window.location.href = `playlist.html?id=${playlistId}`;
}

// Cargar playlists al abrir la página
if (document.getElementById("playlists-container")) {
    renderPlaylists();
}
