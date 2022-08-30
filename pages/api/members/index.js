import { db } from "../../../utils/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
      const {roomId} = req.query;

      const members = await db.member.findMany({
          where: {roomId: parseInt(roomId)},
          include: {
              User: true,
              Room: true
          }
      })

      try {
          res.status(200).json(members)
      } catch (error) {
          res.status(401).json(error)
      }

  }
}
