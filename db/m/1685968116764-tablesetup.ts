import { MigrationInterface, QueryRunner } from "typeorm";

export class tablesetup1685968116764 implements MigrationInterface {
    name = 'tablesetup1685968116764'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Rate\` (\`id\` varchar(36) NOT NULL, \`type\` varchar(255) NOT NULL, \`currency\` varchar(255) NOT NULL, \`rate\` int NOT NULL, \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-06-05T12:28:39.325Z', \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-06-05T12:28:39.325Z', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Notification\` (\`id\` varchar(36) NOT NULL, \`userId\` varchar(255) NULL, \`isGeneral\` tinyint NOT NULL DEFAULT 0, \`isAdmin\` tinyint NOT NULL DEFAULT 0, \`adminType\` varchar(255) NULL, \`title\` varchar(255) NOT NULL, \`body\` varchar(255) NOT NULL, \`createdAt\` varchar(255) NOT NULL DEFAULT 'Mon Jun 05 2023', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`SwapPercentage\` (\`id\` varchar(36) NOT NULL, \`percentage\` int NOT NULL, \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-06-05T12:28:39.328Z', \`updatededAt\` varchar(255) NOT NULL DEFAULT '2023-06-05T12:28:39.328Z', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`VerificationDetails\` (\`id\` varchar(36) NOT NULL, \`userId\` varchar(255) NOT NULL, \`link\` varchar(255) NOT NULL, \`metadata\` text NULL, \`approvedBy\` varchar(255) NULL, \`status\` varchar(255) NULL DEFAULT 'PENDING', \`createdAt\` varchar(255) NOT NULL DEFAULT 'Mon Jun 05 2023', \`updatedAt\` varchar(255) NOT NULL DEFAULT 'Mon Jun 05 2023', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`User\` (\`id\` varchar(36) NOT NULL, \`quidaxId\` varchar(255) NULL, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`emailVerified\` tinyint NOT NULL DEFAULT 0, \`accountDisabled\` tinyint NOT NULL DEFAULT 0, \`KYCVerified\` tinyint NOT NULL DEFAULT 0, \`password\` varchar(255) NOT NULL, \`pin\` varchar(255) NULL, \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-06-05T12:28:39.934Z', \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-06-05T12:28:39.934Z', \`userId\` int NULL, UNIQUE INDEX \`REL_45f0625bd8172eb9c821c948a0\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Bank\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` varchar(255) NULL, \`bankId\` int NOT NULL, \`name\` varchar(255) NOT NULL, \`code\` varchar(255) NOT NULL, \`accountNumber\` varchar(255) NOT NULL, \`accountName\` varchar(255) NOT NULL, \`isLinked\` tinyint NOT NULL DEFAULT 0, \`isAdminAccount\` tinyint NOT NULL DEFAULT 0, \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-06-05T12:28:39.936Z', \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-06-05T12:28:39.936Z', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Transaction\` (\`id\` varchar(36) NOT NULL, \`userId\` varchar(255) NOT NULL, \`adminId\` varchar(255) NULL, \`quidaxTransactionId\` varchar(255) NULL, \`adminQuidaxTransactionId\` varchar(255) NULL, \`transactionType\` int NOT NULL, \`bankId\` int NULL, \`transactionCurrency\` varchar(255) NOT NULL, \`transactionAmount\` float NOT NULL, \`rate\` int NULL, \`currencyRate\` int NULL, \`payoutCurrency\` varchar(255) NULL, \`hash\` varchar(255) NULL, \`payoutAmount\` float NULL, \`images\` text NULL, \`transactionReference\` varchar(255) NOT NULL, \`withdrawalAddress\` varchar(255) NULL, \`status\` int NULL, \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-06-05T12:28:39.936Z', \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-06-05T12:28:39.936Z', \`adminBankId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Admin\` (\`id\` varchar(36) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`fullname\` varchar(255) NOT NULL, \`bio\` varchar(255) NOT NULL, \`roles\` text NOT NULL, \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-06-05T12:28:39.937Z', \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-06-05T12:28:39.937Z', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`AdminRole\` (\`id\` varchar(36) NOT NULL, \`role\` varchar(255) NOT NULL, \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-06-05T12:28:39.938Z', \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-06-05T12:28:39.938Z', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Coin\` (\`id\` varchar(36) NOT NULL, \`userId\` varchar(255) NOT NULL, \`coinType\` int NOT NULL, \`address\` varchar(255) NOT NULL, \`network\` varchar(255) NOT NULL, \`amount\` float NOT NULL DEFAULT '0', \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-06-05T12:28:39.938Z', \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-06-05T12:28:39.938Z', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`OTP\` (\`id\` varchar(36) NOT NULL, \`userId\` varchar(255) NOT NULL, \`code\` int NOT NULL, \`type\` int NOT NULL, \`expired\` tinyint NOT NULL DEFAULT 0, \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-06-05T12:28:39.941Z', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Balance\` (\`id\` varchar(36) NOT NULL, \`userId\` varchar(255) NOT NULL, \`balance\` int NOT NULL DEFAULT '0', \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-06-05T12:28:39.942Z', \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-06-05T12:28:39.942Z', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`NextOfKin\` (\`id\` varchar(36) NOT NULL, \`userId\` varchar(255) NOT NULL, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`phoneNumber\` varchar(255) NOT NULL, \`email\` varchar(255) NULL, \`relationship\` varchar(255) NOT NULL, \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-06-05T12:28:39.942Z', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`User\` ADD CONSTRAINT \`FK_45f0625bd8172eb9c821c948a0f\` FOREIGN KEY (\`userId\`) REFERENCES \`Bank\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Transaction\` ADD CONSTRAINT \`FK_32a6e4065ab9d7275321271d3ae\` FOREIGN KEY (\`userId\`) REFERENCES \`User\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Transaction\` ADD CONSTRAINT \`FK_8f5cfa61bb9bf865fb3d1aeca55\` FOREIGN KEY (\`adminId\`) REFERENCES \`Admin\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Transaction\` ADD CONSTRAINT \`FK_a931903a69797eb74460349f4cc\` FOREIGN KEY (\`adminBankId\`) REFERENCES \`Bank\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Transaction\` DROP FOREIGN KEY \`FK_a931903a69797eb74460349f4cc\``);
        await queryRunner.query(`ALTER TABLE \`Transaction\` DROP FOREIGN KEY \`FK_8f5cfa61bb9bf865fb3d1aeca55\``);
        await queryRunner.query(`ALTER TABLE \`Transaction\` DROP FOREIGN KEY \`FK_32a6e4065ab9d7275321271d3ae\``);
        await queryRunner.query(`ALTER TABLE \`User\` DROP FOREIGN KEY \`FK_45f0625bd8172eb9c821c948a0f\``);
        await queryRunner.query(`DROP TABLE \`NextOfKin\``);
        await queryRunner.query(`DROP TABLE \`Balance\``);
        await queryRunner.query(`DROP TABLE \`OTP\``);
        await queryRunner.query(`DROP TABLE \`Coin\``);
        await queryRunner.query(`DROP TABLE \`AdminRole\``);
        await queryRunner.query(`DROP TABLE \`Admin\``);
        await queryRunner.query(`DROP TABLE \`Transaction\``);
        await queryRunner.query(`DROP TABLE \`Bank\``);
        await queryRunner.query(`DROP INDEX \`REL_45f0625bd8172eb9c821c948a0\` ON \`User\``);
        await queryRunner.query(`DROP TABLE \`User\``);
        await queryRunner.query(`DROP TABLE \`VerificationDetails\``);
        await queryRunner.query(`DROP TABLE \`SwapPercentage\``);
        await queryRunner.query(`DROP TABLE \`Notification\``);
        await queryRunner.query(`DROP TABLE \`Rate\``);
    }

}
