// Configuration for Pokemon Search Frontend

// Default API URL (Will prioritize user stored custom URL if available in localStorage)
// You can replace this string with your Render deployment URL (e.g. "https://your-app-name.onrender.com")
const DEFAULT_API_URL = "https://jack-li-backfrontend.onrender.com";

function getApiBaseUrl() {
    const savedUrl = localStorage.getItem("pokemon_api_url");
    if (savedUrl && savedUrl.trim() !== "") {
        return savedUrl.trim().replace(/\/+$/, "");
    }
    return DEFAULT_API_URL.replace(/\/+$/, "");
}

function setApiBaseUrl(url) {
    if (url && url.trim() !== "") {
        localStorage.setItem("pokemon_api_url", url.trim().replace(/\/+$/, ""));
    } else {
        localStorage.removeItem("pokemon_api_url");
    }
}
