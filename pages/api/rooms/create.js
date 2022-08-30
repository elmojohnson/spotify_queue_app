import { db } from "../../../utils/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { roomName, hostId } = req.body;

    const newRoom = await db.room.create({
      data: {
        roomName,
        hostId,
      },
    });

    await db.member.create({
      data: {
        isHost: true,
        userId: hostId,
        roomId: newRoom.id,
      },
    });

    try {
      res.status(200).json({ id: newRoom.roomName });
    } catch (error) {
      res.status(401).json({ error });
    }
  }
}
