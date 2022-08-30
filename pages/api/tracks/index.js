import { db } from "../../../utils/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { roomId } = req.query;

    const tracks = await db.track.findMany({
        where: {roomId: parseInt(roomId)},
        orderBy: {addedAt: "desc"}
    });

    try {
        res.status(200).json(tracks)
    } catch (error) {
        res.status(401).json(error)
    }

  }
}
