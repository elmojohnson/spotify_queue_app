import { db } from "../../../utils/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, artists, album, albumImg, uri, roomId, userId, user } = req.body;

    const membership = await db.member.findFirst({
      where: { roomId: parseInt(roomId), userId: parseInt(userId) },
    });

    const track = await db.track.create({
      data: {
        name,
        artists,
        album,
        albumImg,
        roomId: parseInt(roomId),
        memberId: membership.id,
        uri,
        requestedBy: user
      },
    });

    try {
      res.status(200).json(track);
    } catch (error) {
      res.status(401).json(error);
    }
  }
}
