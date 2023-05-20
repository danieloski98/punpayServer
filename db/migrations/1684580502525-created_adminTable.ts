import { MigrationInterface, QueryRunner } from "typeorm";

export class createdAdminTable1684580502525 implements MigrationInterface {
    name = 'createdAdminTable1684580502525'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Transaction\` (\`id\` varchar(36) NOT NULL, \`userId\` varchar(255) NOT NULL, \`adminId\` varchar(255) NULL, \`quidaxTransactionId\` varchar(255) NULL, \`adminQuidaxTransactionId\` varchar(255) NULL, \`transactionType\` int NOT NULL, \`bankId\` int NULL, \`transactionCurrency\` varchar(255) NOT NULL, \`transactionAmount\` float NOT NULL, \`rate\` int NULL, \`currencyRate\` int NULL, \`payoutCurrency\` varchar(255) NULL, \`hash\` varchar(255) NULL, \`payoutAmount\` float NULL, \`images\` text NULL, \`transactionReference\` varchar(255) NOT NULL, \`withdrawalAddress\` varchar(255) NULL, \`status\` int NULL, \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-05-20T11:01:44.267Z', \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-05-20T11:01:44.267Z', \`adminBankId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Admin\` (\`id\` varchar(36) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`fullname\` varchar(255) NOT NULL, \`bio\` varchar(255) NOT NULL, \`roles\` text NOT NULL, \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-05-20T11:01:44.268Z', \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-05-20T11:01:44.268Z', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`SwapPercentage\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-05-20T11:01:43.518Z'`);
        await queryRunner.query(`ALTER TABLE \`SwapPercentage\` CHANGE \`updatededAt\` \`updatededAt\` varchar(255) NOT NULL DEFAULT '2023-05-20T11:01:43.518Z'`);
        await queryRunner.query(`ALTER TABLE \`Rate\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-05-20T11:01:43.516Z'`);
        await queryRunner.query(`ALTER TABLE \`Rate\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-05-20T11:01:43.516Z'`);
        await queryRunner.query(`ALTER TABLE \`User\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-05-20T11:01:44.265Z'`);
        await queryRunner.query(`ALTER TABLE \`User\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-05-20T11:01:44.265Z'`);
        await queryRunner.query(`ALTER TABLE \`Bank\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-05-20T11:01:44.267Z'`);
        await queryRunner.query(`ALTER TABLE \`Bank\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-05-20T11:01:44.267Z'`);
        await queryRunner.query(`ALTER TABLE \`AdminRole\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-05-20T11:01:44.269Z'`);
        await queryRunner.query(`ALTER TABLE \`AdminRole\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-05-20T11:01:44.269Z'`);
        await queryRunner.query(`ALTER TABLE \`Coin\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-05-20T11:01:44.269Z'`);
        await queryRunner.query(`ALTER TABLE \`Coin\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-05-20T11:01:44.269Z'`);
        await queryRunner.query(`ALTER TABLE \`OTP\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-05-20T11:01:44.270Z'`);
        await queryRunner.query(`ALTER TABLE \`Balance\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-05-20T11:01:44.271Z'`);
        await queryRunner.query(`ALTER TABLE \`Balance\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-05-20T11:01:44.271Z'`);
        await queryRunner.query(`ALTER TABLE \`NextOfKin\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-05-20T11:01:44.271Z'`);
        await queryRunner.query(`ALTER TABLE \`Transaction\` ADD CONSTRAINT \`FK_32a6e4065ab9d7275321271d3ae\` FOREIGN KEY (\`userId\`) REFERENCES \`User\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Transaction\` ADD CONSTRAINT \`FK_8f5cfa61bb9bf865fb3d1aeca55\` FOREIGN KEY (\`adminId\`) REFERENCES \`Admin\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Transaction\` ADD CONSTRAINT \`FK_a931903a69797eb74460349f4cc\` FOREIGN KEY (\`adminBankId\`) REFERENCES \`Bank\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Transaction\` DROP FOREIGN KEY \`FK_a931903a69797eb74460349f4cc\``);
        await queryRunner.query(`ALTER TABLE \`Transaction\` DROP FOREIGN KEY \`FK_8f5cfa61bb9bf865fb3d1aeca55\``);
        await queryRunner.query(`ALTER TABLE \`Transaction\` DROP FOREIGN KEY \`FK_32a6e4065ab9d7275321271d3ae\``);
        await queryRunner.query(`ALTER TABLE \`NextOfKin\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-05-20T08:19:56.265Z'`);
        await queryRunner.query(`ALTER TABLE \`Balance\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-05-20T08:19:56.264Z'`);
        await queryRunner.query(`ALTER TABLE \`Balance\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-05-20T08:19:56.264Z'`);
        await queryRunner.query(`ALTER TABLE \`OTP\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-05-20T08:19:56.263Z'`);
        await queryRunner.query(`ALTER TABLE \`Coin\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-05-20T08:19:56.260Z'`);
        await queryRunner.query(`ALTER TABLE \`Coin\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-05-20T08:19:56.260Z'`);
        await queryRunner.query(`ALTER TABLE \`AdminRole\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-05-20T08:19:56.259Z'`);
        await queryRunner.query(`ALTER TABLE \`AdminRole\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-05-20T08:19:56.259Z'`);
        await queryRunner.query(`ALTER TABLE \`Bank\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-05-20T08:19:56.257Z'`);
        await queryRunner.query(`ALTER TABLE \`Bank\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-05-20T08:19:56.257Z'`);
        await queryRunner.query(`ALTER TABLE \`User\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-05-20T08:19:56.254Z'`);
        await queryRunner.query(`ALTER TABLE \`User\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-05-20T08:19:56.254Z'`);
        await queryRunner.query(`ALTER TABLE \`Rate\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-05-20T08:19:55.364Z'`);
        await queryRunner.query(`ALTER TABLE \`Rate\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-05-20T08:19:55.364Z'`);
        await queryRunner.query(`ALTER TABLE \`SwapPercentage\` CHANGE \`updatededAt\` \`updatededAt\` varchar(255) NOT NULL DEFAULT '2023-05-20T08:19:55.368Z'`);
        await queryRunner.query(`ALTER TABLE \`SwapPercentage\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-05-20T08:19:55.367Z'`);
        await queryRunner.query(`DROP TABLE \`Admin\``);
        await queryRunner.query(`DROP TABLE \`Transaction\``);
    }

}
