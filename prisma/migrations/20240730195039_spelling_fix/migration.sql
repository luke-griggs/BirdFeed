/*
  Warnings:

  - You are about to drop the `Bird` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Bird" DROP CONSTRAINT "Bird_userId_fkey";

-- DropTable
DROP TABLE "Bird";

-- CreateTable
CREATE TABLE "Birds" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Birds_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Birds" ADD CONSTRAINT "Birds_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
