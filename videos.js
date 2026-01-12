// Base de datos de videos con fechas reales
const videos = [
    {
        id: 1,
        title: "Mi primer video",
        author: "World Time",
        thumbnail: "data:image/svg+xml,%3Csvg%20width='320'%20height='180'%20xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient%20id='grad1'%20x1='0%25'%20y1='0%25'%20x2='100%25'%20y2='100%25'%3E%3Cstop%20offset='0%25'%20style='stop-color:%231a1a1a;stop-opacity:1'%20/%3E%3Cstop%20offset='100%25'%20style='stop-color:%232d2d2d;stop-opacity:1'%20/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width='320'%20height='180'%20fill='url(%23grad1)'/%3E%3Ccircle%20cx='160'%20cy='90'%20r='30'%20fill='rgba(0,%20191,%20255,%200.8)'/%3E%3Cpolygon%20points='150,80%20150,100%20170,90'%20fill='white'/%3E%3Ctext%20x='160'%20y='140'%20font-size='16'%20font-weight='bold'%20fill='white'%20text-anchor='middle'%20font-family='Arial'%3EMi%20primer%20video%3C/text%3E%3C/svg%3E",
        src: "videos/1.mp4",
        uploadDate: new Date("2025-01-08"),
        duration: "12:34"
    },
    {
        id: 2,
        title: "Tutorial Create Mod",
        author: "OptiTime",
        thumbnail: "data:image/svg+xml,%3Csvg%20width='320'%20height='180'%20xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient%20id='grad2'%20x1='0%25'%20y1='0%25'%20x2='100%25'%20y2='100%25'%3E%3Cstop%20offset='0%25'%20style='stop-color:%231a4d1a;stop-opacity:1'%20/%3E%3Cstop%20offset='100%25'%20style='stop-color:%232d4d2d;stop-opacity:1'%20/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width='320'%20height='180'%20fill='url(%23grad2)'/%3E%3Ccircle%20cx='160'%20cy='90'%20r='30'%20fill='rgba(0,%20191,%20255,%200.8)'/%3E%3Cpolygon%20points='150,80%20150,100%20170,90'%20fill='white'/%3E%3Ctext%20x='160'%20y='140'%20font-size='14'%20font-weight='bold'%20fill='white'%20text-anchor='middle'%20font-family='Arial'%3ETutorial%20Create%20Mod%3C/text%3E%3C/svg%3E",
        src: "videos/video2.mp4",
        uploadDate: new Date("2025-01-10"),
        duration: "25:45"
    },
    // Agrega más videos:
    // {
    //     id: 3,
    //     title: "Título del video",
    //     author: "Autor",
    //     thumbnail: "thumbnails/video3.jpg",
    //     src: "videos/video3.mp4",
    //     uploadDate: new Date("2026-01-12"),
    //     duration: "15:20"
    // }
];

// Ordenar videos por fecha (más recientes primero)
videos.sort((a, b) => b.uploadDate - a.uploadDate);

// Playlists - Organiza tus videos por categorías
const playlists = [
    {
        id: 1,
        title: "Mi Playlist 1",
        description: "Mi colección de videos favoritos",
        thumbnail: "thumbnails/video1.jpg",
        videos: [1, 2]
    },
    {
        id: 2,
        title: "Tutorials",
        description: "Tutoriales útiles",
        thumbnail: "thumbnails/video2.jpg",
        videos: [2]
    },
    // Agrega más playlists:
    // {
    //     id: 3,
    //     title: "Otra Playlist",
    //     description: "Descripción",
    //     thumbnail: "thumbnails/video3.jpg",
    //     videos: [1, 3, 4]
    // }
];

// Funciones de utilidad
function getVideosByIds(ids) {
    return videos.filter(v => ids.includes(v.id));
}

function formatUploadDate(date) {
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Hoy";
    if (diffDays === 1) return "Ayer";
    if (diffDays < 7) return `Hace ${diffDays} días`;
    if (diffDays < 30) return `Hace ${Math.floor(diffDays / 7)} semanas`;
    if (diffDays < 365) return `Hace ${Math.floor(diffDays / 30)} meses`;
    return `Hace ${Math.floor(diffDays / 365)} años`;
}
