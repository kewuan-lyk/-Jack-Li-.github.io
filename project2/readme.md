# Pokemon Collector

This project is a website. It uses the browser to call PokéAPI, mainly with `GET https://pokeapi.co/api/v2/pokemon/{id}` and `GET https://pokeapi.co/api/v2/pokemon-species/{id}`. The parameter is the Pokémon number (from 1 to 151), and the API returns JSON data, including height, weight, stats, and Pokédex text
For this program, no API key or other authentication is needed. Pokémon artwork is loaded from the public PokéAPI GitHub image files, and the app keeps simple game progress in the browser's local storage.

## How to run

You only need a modern web browser and Python 3 (or another simple local web server). You can also open `index.html` directly, but using a local server is recommended because the app makes requests to an external API.

## API and credits

The app uses [PokéAPI](https://pokeapi.co/), which is free and does not require a key. If the API is unavailable, the app keeps basic local data and shows fallback text instead of exposing or requesting any secret credentials.