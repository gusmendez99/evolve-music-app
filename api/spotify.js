//Spotify API 
const SPOTIFY_API_URL = 'https://api.spotify.com/v1/search?';
const SpotifyWebApi = require("spotify-web-api-node");

// credentials are optional
const spotifyApi = new SpotifyWebApi({
  clientId: "2095a5db5b1643db82d3090b93edfc47",
  clientSecret: "c2c177bf919847f7af0f005f3585d86a",
  redirectUri: "http://www.example.com/callback"
});


module.exports = {
  SPOTIFY_API_URL,
  spotifyApi
};