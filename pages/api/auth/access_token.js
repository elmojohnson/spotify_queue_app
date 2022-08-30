const SpotifyWebApi = require("spotify-web-api-node");
import {db} from "../../../utils/db"

export default function handler(req, res) {
  if (req.method === "POST") {
    const spotify = new SpotifyWebApi({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      redirectUri: process.env.SPOTIFY_REDIRECT_URI,
    });

    // Authenticate
    spotify
      .authorizationCodeGrant(req.body.code)
      .then(async (auth) => {
        // User data
        spotify.setAccessToken(auth.body.access_token);
        const user = await spotify.getMe();

        // Save to db if not existed
        const userAccount = await db.user.upsert({
          where: { spotifyId: user.body.id },
          update: {},
          create: {
            displayName: user.body.display_name,
            email: user.body.email,
            spotifyId: user.body.id,
            avatar: user.body.images[0].url || "",
          },
        });

        // Final response
        try {
          res.status(200).json({
            accessToken: auth.body.access_token,
            refreshToken: auth.body.refresh_token,
            expiresIn: auth.body.expires_in,
            currentUser: {
              id: userAccount.id,
              displayName: user.body.display_name,
              email: user.body.email,
              spotifyId: user.body.id,
              avatar: user.body.images[0].url || "",
            },
          });
        } catch (error) {
          res.status(401).json(error);
        }
      })
      .catch((error) => {
        res.status(401).json({ error });
      });
  }
}
