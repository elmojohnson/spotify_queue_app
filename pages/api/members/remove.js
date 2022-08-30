import { db } from "../../../utils/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { userId, roomId } = req.body;

    const member = await db.member.findFirst({ where: { userId: parseInt(userId), roomId: parseInt(roomId) } });
    const deletedMember = await db.member.delete({where: {id: member.id}})

    try {
      res.status(200).json(deletedMember);
    } catch (error) {
      res.status(401).json(error);
    }
  }
}
