import {db} from "../../../../utils/db"

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { userId } = req.query;

    // res.json(userId[0])

    const rooms = await db.member.findMany({
        where: {
            userId: parseInt(userId[0])
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
