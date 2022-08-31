import { db } from "../../../utils/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { roomId } = req.query;

    const room = await db.room.findUnique({
      where: {
        id: parseInt(roomId),
      },
      include: {
        Member: true,
        User: true,
      },
    });
    try {
      res.status(200).json(room);
    } catch (error) {
      res.status(401).json(error);
    }
  }
}
