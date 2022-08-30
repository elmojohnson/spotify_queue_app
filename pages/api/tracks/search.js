const SpotifyWebApi = require("spotify-web-api-node");

export default function handler(req, res) {
  if (req.method === "POST") {
    const { accessToken, search } = req.body;
    const spotify = new SpotifyWebApi();

    spotify.setAccessToken(accessToken);
    spotify
      .searchTracks(search)
      .then((result) => {
        if(result.statusCode === 401) {
          res.status(401).json({isError: true});
        } else {
          res.status(200).json(result)
        }
      })
      .catch((error) => {
        res.status(401).json({isError: true, error});
      });
  }
}
