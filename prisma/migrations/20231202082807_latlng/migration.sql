/*
  Warnings:

  - You are about to drop the column `status` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `lat` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `lng` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `products` DROP COLUMN `status`;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `lat`,
    DROP COLUMN `lng`,
    ADD COLUMN `latlng` VARCHAR(191) NULL;
