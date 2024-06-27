-- CreateEnum
CREATE TYPE "user_type_enum" AS ENUM ('user', 'admin');

-- CreateEnum
CREATE TYPE "order_status_enum" AS ENUM ('new', 'ready', 'finished');

-- CreateEnum
CREATE TYPE "cart_status_enum" AS ENUM ('new', 'ordered', 'cancelled');

-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL DEFAULT GEN_RANDOM_UUID(),
    "type" "user_type_enum" NOT NULL DEFAULT 'user',
    "email" VARCHAR NOT NULL,
    "full_name" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,
    "deleted_at" TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);
