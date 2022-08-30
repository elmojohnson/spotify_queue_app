import { db } from "../../../utils/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { userId, roomId } = req.body;

    const member = await db.member.create({
      data: { userId: parseInt(userId), roomId: parseInt(roomId) },
    });

    try {
      res.status(200).json(member);
    } catch (error) {
      res.status(401).json(error);
    }
  }
}
