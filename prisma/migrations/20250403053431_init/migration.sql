/*
  Warnings:

  - You are about to drop the column `content` on the `Task` table. All the data in the column will be lost.
  - Made the column `user_id` on table `Task` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "StatusType" AS ENUM ('COMPLETED', 'PENDING', 'IN_PROGRESS');

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_user_id_fkey";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "content",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "status" "StatusType" NOT NULL DEFAULT 'PENDING',
ALTER COLUMN "user_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
