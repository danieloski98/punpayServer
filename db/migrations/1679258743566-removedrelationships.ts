import { MigrationInterface, QueryRunner } from "typeorm";

export class removedrelationships1679258743566 implements MigrationInterface {
    name = 'removedrelationships1679258743566'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Rate\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:45:45.441Z'`);
        await queryRunner.query(`ALTER TABLE \`Rate\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:45:45.441Z'`);
        await queryRunner.query(`ALTER TABLE \`Bank\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:45:47.223Z'`);
        await queryRunner.query(`ALTER TABLE \`Bank\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:45:47.223Z'`);
        await queryRunner.query(`ALTER TABLE \`User\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:45:47.224Z'`);
        await queryRunner.query(`ALTER TABLE \`User\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:45:47.224Z'`);
        await queryRunner.query(`ALTER TABLE \`Admin\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:45:47.227Z'`);
        await queryRunner.query(`ALTER TABLE \`Admin\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:45:47.227Z'`);
        await queryRunner.query(`ALTER TABLE \`Coin\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:45:47.228Z'`);
        await queryRunner.query(`ALTER TABLE \`Coin\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:45:47.228Z'`);
        await queryRunner.query(`ALTER TABLE \`Transaction\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:45:47.235Z'`);
        await queryRunner.query(`ALTER TABLE \`Transaction\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:45:47.235Z'`);
        await queryRunner.query(`ALTER TABLE \`OTP\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:45:47.236Z'`);
        await queryRunner.query(`ALTER TABLE \`Balance\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:45:47.237Z'`);
        await queryRunner.query(`ALTER TABLE \`Balance\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:45:47.237Z'`);
        await queryRunner.query(`ALTER TABLE \`NextOfKin\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:45:47.239Z'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`NextOfKin\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:45:24.521Z'`);
        await queryRunner.query(`ALTER TABLE \`Balance\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:45:24.360Z'`);
        await queryRunner.query(`ALTER TABLE \`Balance\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:45:24.360Z'`);
        await queryRunner.query(`ALTER TABLE \`OTP\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:45:24.031Z'`);
        await queryRunner.query(`ALTER TABLE \`Transaction\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:45:24.746Z'`);
        await queryRunner.query(`ALTER TABLE \`Transaction\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:45:24.746Z'`);
        await queryRunner.query(`ALTER TABLE \`Coin\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:45:24.489Z'`);
        await queryRunner.query(`ALTER TABLE \`Coin\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:45:24.489Z'`);
        await queryRunner.query(`ALTER TABLE \`Admin\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:45:24.624Z'`);
        await queryRunner.query(`ALTER TABLE \`Admin\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:45:24.624Z'`);
        await queryRunner.query(`ALTER TABLE \`User\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:45:24.270Z'`);
        await queryRunner.query(`ALTER TABLE \`User\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:45:24.270Z'`);
        await queryRunner.query(`ALTER TABLE \`Bank\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:45:24.267Z'`);
        await queryRunner.query(`ALTER TABLE \`Bank\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:45:24.267Z'`);
        await queryRunner.query(`ALTER TABLE \`Rate\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:45:24.722Z'`);
        await queryRunner.query(`ALTER TABLE \`Rate\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:45:24.722Z'`);
    }

}
