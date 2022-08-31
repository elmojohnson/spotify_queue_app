import { db } from "../../../utils/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { roomId } = req.body;

    await db.room.delete({where: {id: parseInt(roomId)}});

    try {
        res.status(200).json({isDeleted: true})
    } catch (error) {
        res.status(200).json({isDeleted: true, error})
    }

  }
}
