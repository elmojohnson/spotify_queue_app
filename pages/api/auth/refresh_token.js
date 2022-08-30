const SpotifyWebApi = require("spotify-web-api-node");

export default async function handler(req, res) {
  if (req.method === "POST") {
    const spotify = new SpotifyWebApi({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      redirectUri: process.env.SPOTIFY_REDIRECT_URI,
    });

    const { refreshToken } = req.body;

    spotify.setRefreshToken(refreshToken);

    const auth = await spotify.refreshAccessToken();

    console.log(refreshToken)

    console.log("TOKEN REFRESHED!")

    try {
      res.status(200).json({
        accessToken: auth.body.access_token,
        refreshToken: auth.body.refresh_token
      });
    } catch (error) {
      res.status(401).json({ error });
    }
  }
}
