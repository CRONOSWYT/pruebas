// ===============================
// HISTORIAL DE VISUALIZACIÓN
// ===============================
function addToWatchHistory(videoId) {
    let history = JSON.parse(localStorage.getItem("watchHistory")) || [];
    // Eliminar si ya existe
    history = history.filter(h => h.videoId !== videoId);
    // Agregar al inicio
    history.unshift({
        videoId: videoId,
        timestamp: new Date().toISOString()
    });
    // Guardar solo los últimos 50 videos
    history = history.slice(0, 50);
    localStorage.setItem("watchHistory", JSON.stringify(history));
}

function getWatchHistory() {
    return JSON.parse(localStorage.getItem("watchHistory")) || [];
}

function getHistoryVideos() {
    const history = getWatchHistory();
    return history.map(h => videos.find(v => v.id === h.videoId)).filter(v => v);
}

// ===============================
// SISTEMA PRINCIPAL - PÁGINA DE INICIO
// ===============================

function renderVideos(list, containerId = "video-list") {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = "";

    if (list.length === 0) {
        container.innerHTML = "<p style='grid-column: 1/-1; text-align: center; color: #aaa;'>No se encontraron videos</p>";
        return;
    }

    list.forEach(v => {
        const html = `
            <div class="video-card" onclick="openVideo(${v.id})">
                <div class="video-thumbnail">
                    <img src="${v.thumbnail}" alt="${v.title}" onerror="this.src='data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%22210%22%20height=%22118%22%3E%3Crect%20fill=%22%23212121%22%20width=%22210%22%20height=%22118%22/%3E%3Ctext%20x=%2210%22%20y=%2260%22%20font-size=%2212%22%20fill=%22%23888%22%3E${v.title.substring(0, 20)}%3C/text%3E%3C/svg%3E'">
                    <div class="video-overlay">▶</div>
                    <div class="video-duration">${v.duration}</div>
                </div>
                <h3>${v.title}</h3>
                <p class="video-author">${v.author}</p>
                <p class="video-meta">${formatUploadDate(v.uploadDate)}</p>
            </div>
        `;
        container.innerHTML += html;
    });
}

function openVideo(id) {
    window.location.href = `video.html?id=${id}`;
}

// Buscador
const searchInput = document.getElementById("search");
if (searchInput) {
    searchInput.addEventListener("keyup", e => {
        const text = e.target.value.toLowerCase();
        const filtered = videos.filter(v => 
            v.title.toLowerCase().includes(text) ||
            v.author.toLowerCase().includes(text)
        );
        renderVideos(filtered);
    });
}

// Mostrar videos recientes y historial
function initializePage() {
    const videoList = document.getElementById("video-list");
    const historyContainer = document.getElementById("watch-history");
    
    if (videoList) {
        renderVideos(videos, "video-list");
    }
    
    if (historyContainer) {
        const history = getHistoryVideos();
        if (history.length > 0) {
            renderVideos(history.slice(0, 6), "watch-history");
            document.getElementById("history-section").style.display = "block";
        }
    }
}

// Cargar página
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePage);
} else {
    initializePage();
}
