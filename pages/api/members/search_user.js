import { db } from "../../../utils/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { id, roomId } = req.body;

    const user = await db.user.findUnique({ where: { spotifyId: id } });
    const userInRoom = await db.member.findFirst({where: {userId: parseInt(user.id), roomId: parseInt(roomId)}});

    try {
      if(userInRoom) {
        res.status(200).json({isMember: true, user});
      } else {
        res.status(200).json({isMember: false, user});
      }
    } catch (error) {
      res.status(401).json(error);
    }
  }
}
