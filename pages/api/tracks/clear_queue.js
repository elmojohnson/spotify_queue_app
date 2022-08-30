import { db } from "../../../utils/db";
export default async function handler(req, res) {
  if (req.method === "POST") {
    const { roomId } = req.body;

    const tracks = await db.track.deleteMany({where: {roomId: parseInt(roomId), isQueued: true}});

    try {
        res.status(200).json(tracks)
    } catch (error) {
        res.status(401).json(error)
    }

  }
}
