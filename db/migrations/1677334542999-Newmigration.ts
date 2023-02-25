import { MigrationInterface, QueryRunner } from "typeorm";

export class Newmigration1677334542999 implements MigrationInterface {
    name = 'Newmigration1677334542999'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Rate\` (\`id\` varchar(36) NOT NULL, \`type\` varchar(255) NOT NULL, \`currency\` varchar(255) NOT NULL, \`rate\` int NOT NULL, \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-02-25T14:15:45.106Z', \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-02-25T14:15:45.106Z', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`User\` (\`id\` varchar(36) NOT NULL, \`fluidCoinId\` varchar(255) NULL, \`fluidCoinReference\` varchar(255) NULL, \`quidaxId\` varchar(255) NULL, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`emailVerified\` tinyint NOT NULL DEFAULT 0, \`KYCVerified\` tinyint NOT NULL DEFAULT 0, \`password\` varchar(255) NOT NULL, \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-02-25T14:15:45.414Z', \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-02-25T14:15:45.414Z', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Bank\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` varchar(255) NULL, \`bankId\` int NOT NULL, \`name\` varchar(255) NOT NULL, \`code\` varchar(255) NOT NULL, \`accountNumber\` varchar(255) NOT NULL, \`accountName\` varchar(255) NOT NULL, \`isLinked\` tinyint NOT NULL DEFAULT 0, \`isAdminAccount\` tinyint NOT NULL DEFAULT 0, \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-02-25T14:15:45.415Z', \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-02-25T14:15:45.415Z', UNIQUE INDEX \`REL_8bd7936d290df307b720ffe0cf\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Coin\` (\`id\` varchar(36) NOT NULL, \`userId\` varchar(255) NOT NULL, \`coinType\` int NOT NULL, \`address\` varchar(255) NOT NULL, \`network\` varchar(255) NOT NULL, \`amount\` float NOT NULL DEFAULT '0', \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-02-25T14:15:45.417Z', \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-02-25T14:15:45.417Z', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Transaction\` (\`id\` varchar(36) NOT NULL, \`userId\` text NOT NULL, \`quidaxTransactionId\` varchar(255) NOT NULL, \`transactionType\` int NOT NULL, \`bankId\` varchar(255) NULL, \`transaction_currency\` varchar(255) NULL, \`transaction_amount\` float NULL, \`rate\` int NULL, \`currencyRate\` int NOT NULL, \`payout_currency\` text NOT NULL, \`hash\` text NOT NULL, \`payout_amount\` float NOT NULL, \`images\` text NOT NULL, \`withdrawalAddress\` text NOT NULL, \`status\` int NOT NULL, \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-02-25T14:15:45.419Z', \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-02-25T14:15:45.419Z', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`OTP\` (\`id\` varchar(36) NOT NULL, \`userId\` varchar(255) NOT NULL, \`code\` int NOT NULL, \`type\` int NOT NULL, \`expired\` tinyint NOT NULL DEFAULT 0, \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-02-25T14:15:45.420Z', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Balance\` (\`id\` varchar(36) NOT NULL, \`userId\` varchar(255) NOT NULL, \`balance\` int NOT NULL DEFAULT '0', \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-02-25T14:15:45.422Z', \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-02-25T14:15:45.422Z', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`NextOfKin\` (\`id\` varchar(36) NOT NULL, \`userId\` varchar(255) NOT NULL, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`phoneNumber\` varchar(255) NOT NULL, \`email\` varchar(255) NULL, \`relationship\` varchar(255) NOT NULL, \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-02-25T14:15:45.424Z', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`Bank\` ADD CONSTRAINT \`FKUSERBANK\` FOREIGN KEY (\`userId\`) REFERENCES \`User\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Bank\` DROP FOREIGN KEY \`FKUSERBANK\``);
        await queryRunner.query(`DROP TABLE \`NextOfKin\``);
        await queryRunner.query(`DROP TABLE \`Balance\``);
        await queryRunner.query(`DROP TABLE \`OTP\``);
        await queryRunner.query(`DROP TABLE \`Transaction\``);
        await queryRunner.query(`DROP TABLE \`Coin\``);
        await queryRunner.query(`DROP INDEX \`REL_8bd7936d290df307b720ffe0cf\` ON \`Bank\``);
        await queryRunner.query(`DROP TABLE \`Bank\``);
        await queryRunner.query(`DROP TABLE \`User\``);
        await queryRunner.query(`DROP TABLE \`Rate\``);
    }

}
