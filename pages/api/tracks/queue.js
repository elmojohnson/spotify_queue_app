import { db } from "../../../utils/db";
const SpotifyWebApi = require("spotify-web-api-node");

export default async function handler(req, res) {
  if (req.method === "POST") {
    const spotify = new SpotifyWebApi();

    const { id, accessToken } = req.body;

    const requestedTrack = await db.track.findUnique({where: {id}})

    spotify.setAccessToken(accessToken);
    spotify.addToQueue(requestedTrack.uri)
    .then(async (result) => {
      if(result.statusCode === 401) {
        res.status(401).json({isError: true});
      } else {
        await db.track.update({
          where: {id},
          data: {
            isQueued: true
          }
        })
        res.status(200).json(result)
      }
    })
    .catch((error) => {
      res.status(401).json({isError: true, error});
    });
    


  }
}
