import {db} from "../../../../utils/db"

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { userId } = req.query;

    const rooms = await db.member.findMany({
        where: {
            userId: parseInt(userId)
        },
        include: {
          Room: true
        }
    });

    try {
        res.status(200).json(rooms)
    } catch (error) {
        res.status(400).json({error})
    }

  }
}
