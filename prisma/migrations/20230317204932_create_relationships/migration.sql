/*
  Warnings:

  - Added the required column `gym_Id` to the `ckeck_ins` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_Id` to the `ckeck_ins` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ckeck_ins" ADD COLUMN     "gym_Id" TEXT NOT NULL,
ADD COLUMN     "user_Id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ckeck_ins" ADD CONSTRAINT "ckeck_ins_user_Id_fkey" FOREIGN KEY ("user_Id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ckeck_ins" ADD CONSTRAINT "ckeck_ins_gym_Id_fkey" FOREIGN KEY ("gym_Id") REFERENCES "gyms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
