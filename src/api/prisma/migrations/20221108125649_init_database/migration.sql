-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'SUPERINTENDENT', 'SUPERVISOR', 'SEARCHER', 'VIEWER');

-- CreateEnum
CREATE TYPE "DeviceType" AS ENUM ('PEER', 'HOST', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "LogType" AS ENUM ('UPDATE', 'INFO', 'WARNING', 'ERROR', 'FATAL');

-- CreateTable
CREATE TABLE "Image" (
    "id" SERIAL NOT NULL,
    "filename" TEXT NOT NULL,
    "filepath" TEXT NOT NULL,
    "mimetype" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "uuid" TEXT NOT NULL,
    "username" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'VIEWER',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "ImageId" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Room" (
    "uuid" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "identifier" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "ImageId" INTEGER,
    "LaboratoryUuid" TEXT,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Laboratory" (
    "uuid" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "identifier" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "ImageId" INTEGER,
    "BuildingUuid" TEXT,
    "userUuid" TEXT,

    CONSTRAINT "Laboratory_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Building" (
    "uuid" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "identifier" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "ImageId" INTEGER,
    "userUuid" TEXT,

    CONSTRAINT "Building_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Asset" (
    "uuid" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "identifier" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "ImageId" INTEGER,

    CONSTRAINT "Asset_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Device" (
    "uuid" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "identifier" BIGINT NOT NULL,
    "macaddress" TEXT NOT NULL,
    "type" "DeviceType" NOT NULL DEFAULT 'UNKNOWN',
    "battery_level" INTEGER,
    "temperature" DOUBLE PRECISION,
    "last_seen" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "RoomUuid" TEXT,

    CONSTRAINT "Device_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "DeviceLog" (
    "id" BIGSERIAL NOT NULL,
    "type" "LogType" NOT NULL,
    "message" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "DeviceUuid" TEXT NOT NULL,

    CONSTRAINT "DeviceLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeviceLocation" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "DeviceUuid" TEXT NOT NULL,
    "RoomUuid" TEXT NOT NULL,

    CONSTRAINT "DeviceLocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserLog" (
    "id" BIGSERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "user_agent" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UserUuid" TEXT NOT NULL,

    CONSTRAINT "UserLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_RoomToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_AssetToDevice" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Device_identifier_key" ON "Device"("identifier");

-- CreateIndex
CREATE UNIQUE INDEX "Device_macaddress_key" ON "Device"("macaddress");

-- CreateIndex
CREATE UNIQUE INDEX "_RoomToUser_AB_unique" ON "_RoomToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_RoomToUser_B_index" ON "_RoomToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AssetToDevice_AB_unique" ON "_AssetToDevice"("A", "B");

-- CreateIndex
CREATE INDEX "_AssetToDevice_B_index" ON "_AssetToDevice"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_ImageId_fkey" FOREIGN KEY ("ImageId") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_ImageId_fkey" FOREIGN KEY ("ImageId") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_LaboratoryUuid_fkey" FOREIGN KEY ("LaboratoryUuid") REFERENCES "Laboratory"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Laboratory" ADD CONSTRAINT "Laboratory_ImageId_fkey" FOREIGN KEY ("ImageId") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Laboratory" ADD CONSTRAINT "Laboratory_BuildingUuid_fkey" FOREIGN KEY ("BuildingUuid") REFERENCES "Building"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Laboratory" ADD CONSTRAINT "Laboratory_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "User"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Building" ADD CONSTRAINT "Building_ImageId_fkey" FOREIGN KEY ("ImageId") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Building" ADD CONSTRAINT "Building_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "User"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Asset" ADD CONSTRAINT "Asset_ImageId_fkey" FOREIGN KEY ("ImageId") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_RoomUuid_fkey" FOREIGN KEY ("RoomUuid") REFERENCES "Room"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeviceLog" ADD CONSTRAINT "DeviceLog_DeviceUuid_fkey" FOREIGN KEY ("DeviceUuid") REFERENCES "Device"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeviceLocation" ADD CONSTRAINT "DeviceLocation_DeviceUuid_fkey" FOREIGN KEY ("DeviceUuid") REFERENCES "Device"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeviceLocation" ADD CONSTRAINT "DeviceLocation_RoomUuid_fkey" FOREIGN KEY ("RoomUuid") REFERENCES "Room"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserLog" ADD CONSTRAINT "UserLog_UserUuid_fkey" FOREIGN KEY ("UserUuid") REFERENCES "User"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoomToUser" ADD CONSTRAINT "_RoomToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Room"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoomToUser" ADD CONSTRAINT "_RoomToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AssetToDevice" ADD CONSTRAINT "_AssetToDevice_A_fkey" FOREIGN KEY ("A") REFERENCES "Asset"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AssetToDevice" ADD CONSTRAINT "_AssetToDevice_B_fkey" FOREIGN KEY ("B") REFERENCES "Device"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
