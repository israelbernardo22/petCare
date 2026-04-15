-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(150) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(20) NULL,
    `avatarUrl` VARCHAR(500) NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pets` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `species` ENUM('DOG', 'CAT', 'BIRD', 'RABBIT', 'FISH', 'REPTILE', 'OTHER') NOT NULL,
    `breed` VARCHAR(100) NULL,
    `gender` ENUM('MALE', 'FEMALE', 'UNKNOWN') NOT NULL DEFAULT 'UNKNOWN',
    `birthDate` DATE NULL,
    `weight` DECIMAL(5, 2) NULL,
    `color` VARCHAR(50) NULL,
    `microchip` VARCHAR(50) NULL,
    `photoUrl` VARCHAR(500) NULL,
    `notes` TEXT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `pets_microchip_key`(`microchip`),
    INDEX `pets_userId_idx`(`userId`),
    INDEX `pets_species_idx`(`species`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `care_records` (
    `id` VARCHAR(191) NOT NULL,
    `type` ENUM('VACCINE', 'CONSULTATION', 'MEDICATION', 'EXAM', 'SURGERY', 'GROOMING', 'OTHER') NOT NULL,
    `title` VARCHAR(200) NOT NULL,
    `description` TEXT NULL,
    `performedAt` DATETIME(3) NOT NULL,
    `nextDueAt` DATETIME(3) NULL,
    `veterinarian` VARCHAR(100) NULL,
    `clinic` VARCHAR(150) NULL,
    `cost` DECIMAL(8, 2) NULL,
    `attachmentUrl` VARCHAR(500) NULL,
    `batchNumber` VARCHAR(50) NULL,
    `dosage` VARCHAR(100) NULL,
    `isCompleted` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `petId` VARCHAR(191) NOT NULL,

    INDEX `care_records_petId_idx`(`petId`),
    INDEX `care_records_type_idx`(`type`),
    INDEX `care_records_performedAt_idx`(`performedAt`),
    INDEX `care_records_petId_type_idx`(`petId`, `type`),
    INDEX `care_records_petId_performedAt_idx`(`petId`, `performedAt`),
    INDEX `care_records_nextDueAt_idx`(`nextDueAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `pets` ADD CONSTRAINT `pets_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `care_records` ADD CONSTRAINT `care_records_petId_fkey` FOREIGN KEY (`petId`) REFERENCES `pets`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
