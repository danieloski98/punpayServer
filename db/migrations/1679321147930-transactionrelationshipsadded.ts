import { MigrationInterface, QueryRunner } from "typeorm";

export class transactionrelationshipsadded1679321147930 implements MigrationInterface {
    name = 'transactionrelationshipsadded1679321147930'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Rate\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-20T14:05:49.792Z'`);
        await queryRunner.query(`ALTER TABLE \`Rate\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-03-20T14:05:49.792Z'`);
        await queryRunner.query(`ALTER TABLE \`Admin\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-20T14:05:51.447Z'`);
        await queryRunner.query(`ALTER TABLE \`Admin\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-03-20T14:05:51.447Z'`);
        await queryRunner.query(`ALTER TABLE \`Transaction\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-20T14:05:51.448Z'`);
        await queryRunner.query(`ALTER TABLE \`Transaction\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-03-20T14:05:51.448Z'`);
        await queryRunner.query(`ALTER TABLE \`Bank\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-20T14:05:51.450Z'`);
        await queryRunner.query(`ALTER TABLE \`Bank\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-03-20T14:05:51.450Z'`);
        await queryRunner.query(`ALTER TABLE \`User\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-20T14:05:51.451Z'`);
        await queryRunner.query(`ALTER TABLE \`User\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-03-20T14:05:51.451Z'`);
        await queryRunner.query(`ALTER TABLE \`Coin\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-20T14:05:51.453Z'`);
        await queryRunner.query(`ALTER TABLE \`Coin\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-03-20T14:05:51.453Z'`);
        await queryRunner.query(`ALTER TABLE \`OTP\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-20T14:05:51.454Z'`);
        await queryRunner.query(`ALTER TABLE \`Balance\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-20T14:05:51.455Z'`);
        await queryRunner.query(`ALTER TABLE \`Balance\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-03-20T14:05:51.455Z'`);
        await queryRunner.query(`ALTER TABLE \`NextOfKin\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-20T14:05:51.457Z'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`NextOfKin\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-20T14:05:25.071Z'`);
        await queryRunner.query(`ALTER TABLE \`Balance\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-03-20T14:05:24.967Z'`);
        await queryRunner.query(`ALTER TABLE \`Balance\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-20T14:05:24.967Z'`);
        await queryRunner.query(`ALTER TABLE \`OTP\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-20T14:05:24.593Z'`);
        await queryRunner.query(`ALTER TABLE \`Coin\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-03-20T14:05:25.043Z'`);
        await queryRunner.query(`ALTER TABLE \`Coin\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-20T14:05:25.043Z'`);
        await queryRunner.query(`ALTER TABLE \`User\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-03-20T14:05:24.883Z'`);
        await queryRunner.query(`ALTER TABLE \`User\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-20T14:05:24.883Z'`);
        await queryRunner.query(`ALTER TABLE \`Bank\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-03-20T14:05:24.880Z'`);
        await queryRunner.query(`ALTER TABLE \`Bank\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-20T14:05:24.880Z'`);
        await queryRunner.query(`ALTER TABLE \`Transaction\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-03-20T14:05:24.879Z'`);
        await queryRunner.query(`ALTER TABLE \`Transaction\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-20T14:05:24.879Z'`);
        await queryRunner.query(`ALTER TABLE \`Admin\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-03-20T14:05:24.878Z'`);
        await queryRunner.query(`ALTER TABLE \`Admin\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-20T14:05:24.878Z'`);
        await queryRunner.query(`ALTER TABLE \`Rate\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-03-20T14:05:25.275Z'`);
        await queryRunner.query(`ALTER TABLE \`Rate\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-20T14:05:25.275Z'`);
    }

}
