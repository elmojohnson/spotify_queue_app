const SpotifyWebApi = require("spotify-web-api-node");

export default function handler(req, res) {
  if (req.method === "GET") {
    const spotify = new SpotifyWebApi({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      redirectUri: process.env.SPOTIFY_REDIRECT_URI,
    });

    const scopes = [
        "streaming",
        "user-read-email",
        "user-read-private",
        "user-read-currently-playing",
        "user-read-recently-played",
        "user-read-playback-state",
        "user-modify-playback-state",
        "user-top-read",
        "user-read-recently-played",
      ],
      showDialog = true,
      responseType = "code";
    const loginUrl = spotify.createAuthorizeURL(
      scopes,
      showDialog,
      responseType
    );

    res.status(200).json({ loginUrl });
  }
}
