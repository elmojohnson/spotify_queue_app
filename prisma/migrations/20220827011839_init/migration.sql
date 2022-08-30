/*
  Warnings:

  - You are about to drop the column `dateJoined` on the `User` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "displayName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "spotifyId" TEXT NOT NULL,
    "joinedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_User" ("displayName", "email", "id", "spotifyId") SELECT "displayName", "email", "id", "spotifyId" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_spotifyId_key" ON "User"("spotifyId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
