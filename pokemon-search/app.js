// Main Application Logic for PokéSearch Frontend

document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const searchInput = document.getElementById("search-input");
    const searchBtn = document.getElementById("search-btn");
    const quickTags = document.querySelectorAll(".tag-btn");
    
    // States
    const welcomeState = document.getElementById("welcome-state");
    const loadingState = document.getElementById("loading-state");
    const errorState = document.getElementById("error-state");
    const pokemonCard = document.getElementById("pokemon-card");

    // Error elements
    const errorTitle = document.getElementById("error-title");
    const errorMessage = document.getElementById("error-message");
    const retryBtn = document.getElementById("retry-btn");

    // Card elements
    const pokemonId = document.getElementById("pokemon-id");
    const pokemonName = document.getElementById("pokemon-name");
    const pokemonImage = document.getElementById("pokemon-image");
    const pokemonTypes = document.getElementById("pokemon-types");
    const pokemonHeight = document.getElementById("pokemon-height");
    const pokemonWeight = document.getElementById("pokemon-weight");

    // Settings Panel elements
    const toggleSettingsBtn = document.getElementById("toggle-settings-btn");
    const settingsPanel = document.getElementById("settings-panel");
    const apiUrlInput = document.getElementById("api-url-input");
    const saveApiBtn = document.getElementById("save-api-btn");
    const resetApiBtn = document.getElementById("reset-api-btn");

    // Initialize API input field with active URL
    apiUrlInput.value = getApiBaseUrl();

    // Toggle Settings Panel
    toggleSettingsBtn.addEventListener("click", () => {
        settingsPanel.classList.toggle("hidden");
    });

    // Save custom API URL
    saveApiBtn.addEventListener("click", () => {
        const url = apiUrlInput.value.trim();
        setApiBaseUrl(url);
        settingsPanel.classList.add("hidden");
        alert(`Backend API URL updated to:\n${getApiBaseUrl()}`);
    });

    // Reset API URL to default
    resetApiBtn.addEventListener("click", () => {
        setApiBaseUrl("");
        apiUrlInput.value = getApiBaseUrl();
        alert(`Backend API URL reset to default:\n${getApiBaseUrl()}`);
    });

    // Trigger Search on Click
    searchBtn.addEventListener("click", () => {
        performSearch(searchInput.value);
    });

    // Trigger Search on Enter key
    searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            performSearch(searchInput.value);
        }
    });

    // Retry Button
    retryBtn.addEventListener("click", () => {
        if (searchInput.value.trim()) {
            performSearch(searchInput.value);
        } else {
            showState("welcome");
        }
    });

    // Quick Tags Click
    quickTags.forEach(tag => {
        tag.addEventListener("click", () => {
            const query = tag.getAttribute("data-query");
            searchInput.value = query;
            performSearch(query);
        });
    });

    // Main Search Handler
    async function performSearch(query) {
        const cleanedQuery = query.trim().toLowerCase();

        if (!cleanedQuery) {
            showError("Empty Search Query", "Please enter a Pokemon English name or Pokédex number.");
            return;
        }

        showState("loading");

        const baseUrl = getApiBaseUrl();
        const requestUrl = `${baseUrl}/api/pokemon/${encodeURIComponent(cleanedQuery)}`;

        try {
            const response = await fetch(requestUrl);

            if (response.status === 404) {
                const errorData = await response.json().catch(() => ({}));
                const detailMsg = errorData.detail || `Pokemon "${cleanedQuery}" could not be found.`;
                showError("Pokemon Not Found", detailMsg);
                return;
            }

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                const detailMsg = errorData.detail || `Server returned HTTP status ${response.status}.`;
                showError("Server Request Failed", detailMsg);
                return;
            }

            const data = await response.json();
            renderPokemonCard(data);
            showState("card");

        } catch (err) {
            console.error("Fetch error:", err);
            showError(
                "Unable to Connect to Server",
                `Could not establish connection to backend at ${baseUrl}.\n` +
                `If using Render free tier, the initial start might take ~30s. Please check if your Render backend is live.`
            );
        }
    }

    // Render Data to Card
    function renderPokemonCard(data) {
        // Formatted ID (#0025)
        const formattedId = `#${String(data.id).padStart(4, "0")}`;
        pokemonId.textContent = formattedId;

        // Name
        pokemonName.textContent = data.name;

        // Image (with fallback)
        if (data.image) {
            pokemonImage.src = data.image;
            pokemonImage.alt = data.name;
        } else {
            pokemonImage.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png";
            pokemonImage.alt = "No image available";
        }

        // Types (Badges)
        pokemonTypes.innerHTML = "";
        data.types.forEach(type => {
            const badge = document.createElement("span");
            badge.className = `type-badge type-${type.toLowerCase()}`;
            badge.textContent = type;
            pokemonTypes.appendChild(badge);
        });

        // Height & Weight (Decimeters -> Meters, Hectograms -> Kilograms)
        const heightInMeters = (data.height / 10).toFixed(1);
        const weightInKg = (data.weight / 10).toFixed(1);

        pokemonHeight.textContent = `${heightInMeters} m`;
        pokemonWeight.textContent = `${weightInKg} kg`;
    }

    // UI State Manager
    function showState(stateName) {
        welcomeState.classList.add("hidden");
        loadingState.classList.add("hidden");
        errorState.classList.add("hidden");
        pokemonCard.classList.add("hidden");

        if (stateName === "welcome") welcomeState.classList.remove("hidden");
        if (stateName === "loading") loadingState.classList.remove("hidden");
        if (stateName === "error") errorState.classList.remove("hidden");
        if (stateName === "card") pokemonCard.classList.remove("hidden");
    }

    function showError(title, message) {
        errorTitle.textContent = title;
        errorMessage.textContent = message;
        showState("error");
    }
});
