-- AlterTable
ALTER TABLE "tasks" ADD COLUMN     "has_response" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "Reply" (
    "reply_id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "task_id" INTEGER NOT NULL,

    CONSTRAINT "Reply_pkey" PRIMARY KEY ("reply_id")
);

-- AddForeignKey
ALTER TABLE "Reply" ADD CONSTRAINT "Reply_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "tasks"("task_id") ON DELETE CASCADE ON UPDATE CASCADE;
