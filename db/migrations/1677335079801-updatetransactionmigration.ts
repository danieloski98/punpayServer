import { MigrationInterface, QueryRunner } from "typeorm";

export class updatetransactionmigration1677335079801 implements MigrationInterface {
    name = 'updatetransactionmigration1677335079801'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Admin\` (\`id\` varchar(36) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`fullname\` varchar(255) NOT NULL, \`bio\` varchar(255) NOT NULL, \`roles\` text NOT NULL, \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-02-25T14:24:42.056Z', \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-02-25T14:24:42.056Z', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`Rate\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-02-25T14:24:41.811Z'`);
        await queryRunner.query(`ALTER TABLE \`Rate\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-02-25T14:24:41.811Z'`);
        await queryRunner.query(`ALTER TABLE \`User\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-02-25T14:24:42.058Z'`);
        await queryRunner.query(`ALTER TABLE \`User\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-02-25T14:24:42.058Z'`);
        await queryRunner.query(`ALTER TABLE \`Bank\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-02-25T14:24:42.059Z'`);
        await queryRunner.query(`ALTER TABLE \`Bank\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-02-25T14:24:42.059Z'`);
        await queryRunner.query(`ALTER TABLE \`Coin\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-02-25T14:24:42.060Z'`);
        await queryRunner.query(`ALTER TABLE \`Coin\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-02-25T14:24:42.060Z'`);
        await queryRunner.query(`ALTER TABLE \`Transaction\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-02-25T14:24:42.061Z'`);
        await queryRunner.query(`ALTER TABLE \`Transaction\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-02-25T14:24:42.061Z'`);
        await queryRunner.query(`ALTER TABLE \`OTP\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-02-25T14:24:42.062Z'`);
        await queryRunner.query(`ALTER TABLE \`Balance\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-02-25T14:24:42.063Z'`);
        await queryRunner.query(`ALTER TABLE \`Balance\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-02-25T14:24:42.063Z'`);
        await queryRunner.query(`ALTER TABLE \`NextOfKin\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-02-25T14:24:42.064Z'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`NextOfKin\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-02-25T14:23:22.152Z'`);
        await queryRunner.query(`ALTER TABLE \`Balance\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-02-25T14:23:21.934Z'`);
        await queryRunner.query(`ALTER TABLE \`Balance\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-02-25T14:23:21.934Z'`);
        await queryRunner.query(`ALTER TABLE \`OTP\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-02-25T14:23:21.451Z'`);
        await queryRunner.query(`ALTER TABLE \`Transaction\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-02-25T14:23:22.342Z'`);
        await queryRunner.query(`ALTER TABLE \`Transaction\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-02-25T14:23:22.342Z'`);
        await queryRunner.query(`ALTER TABLE \`Coin\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-02-25T14:23:22.021Z'`);
        await queryRunner.query(`ALTER TABLE \`Coin\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-02-25T14:23:22.021Z'`);
        await queryRunner.query(`ALTER TABLE \`Bank\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-02-25T14:23:21.808Z'`);
        await queryRunner.query(`ALTER TABLE \`Bank\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-02-25T14:23:21.808Z'`);
        await queryRunner.query(`ALTER TABLE \`User\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-02-25T14:23:21.808Z'`);
        await queryRunner.query(`ALTER TABLE \`User\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-02-25T14:23:21.808Z'`);
        await queryRunner.query(`ALTER TABLE \`Rate\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-02-25T14:23:22.318Z'`);
        await queryRunner.query(`ALTER TABLE \`Rate\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-02-25T14:23:22.318Z'`);
        await queryRunner.query(`DROP TABLE \`Admin\``);
    }

}
