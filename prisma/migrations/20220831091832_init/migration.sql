-- DropForeignKey
ALTER TABLE `room` DROP FOREIGN KEY `Room_hostId_fkey`;

-- AddForeignKey
ALTER TABLE `Room` ADD CONSTRAINT `Room_hostId_fkey` FOREIGN KEY (`hostId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
