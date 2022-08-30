-- CreateTable
CREATE TABLE "Track" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "artists" TEXT,
    "album" TEXT,
    "albumImg" TEXT,
    "isQueued" BOOLEAN NOT NULL DEFAULT false,
    "roomId" INTEGER,
    "memberId" INTEGER,
    CONSTRAINT "Track_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Track_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
