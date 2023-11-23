/*
  Warnings:

  - You are about to drop the column `media` on the `Posts` table. All the data in the column will be lost.
  - You are about to drop the column `banner` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `profilePicture` on the `Users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Posts" DROP COLUMN "media";

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "banner",
DROP COLUMN "profilePicture";

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "profilePicture" TEXT,
    "banner" TEXT,
    "postId" INTEGER,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Image_profilePicture_key" ON "Image"("profilePicture");

-- CreateIndex
CREATE UNIQUE INDEX "Image_banner_key" ON "Image"("banner");

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_profilePicture_fkey" FOREIGN KEY ("profilePicture") REFERENCES "Users"("username") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_banner_fkey" FOREIGN KEY ("banner") REFERENCES "Users"("username") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Posts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
