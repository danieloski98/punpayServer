import { MigrationInterface, QueryRunner } from "typeorm";

export class verificationChange1688225160171 implements MigrationInterface {
    name = 'verificationChange1688225160171'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Rate\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-07-01T15:26:01.189Z'`);
        await queryRunner.query(`ALTER TABLE \`Rate\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-07-01T15:26:01.189Z'`);
        await queryRunner.query(`ALTER TABLE \`SwapPercentage\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-07-01T15:26:01.193Z'`);
        await queryRunner.query(`ALTER TABLE \`SwapPercentage\` CHANGE \`updatededAt\` \`updatededAt\` varchar(255) NOT NULL DEFAULT '2023-07-01T15:26:01.193Z'`);
        await queryRunner.query(`ALTER TABLE \`User\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-07-01T15:26:01.768Z'`);
        await queryRunner.query(`ALTER TABLE \`User\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-07-01T15:26:01.768Z'`);
        await queryRunner.query(`ALTER TABLE \`Bank\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-07-01T15:26:01.770Z'`);
        await queryRunner.query(`ALTER TABLE \`Bank\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-07-01T15:26:01.770Z'`);
        await queryRunner.query(`ALTER TABLE \`Transaction\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-07-01T15:26:01.771Z'`);
        await queryRunner.query(`ALTER TABLE \`Transaction\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-07-01T15:26:01.771Z'`);
        await queryRunner.query(`ALTER TABLE \`Admin\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-07-01T15:26:01.771Z'`);
        await queryRunner.query(`ALTER TABLE \`Admin\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-07-01T15:26:01.771Z'`);
        await queryRunner.query(`ALTER TABLE \`AdminRole\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-07-01T15:26:01.773Z'`);
        await queryRunner.query(`ALTER TABLE \`AdminRole\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-07-01T15:26:01.773Z'`);
        await queryRunner.query(`ALTER TABLE \`Coin\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-07-01T15:26:01.774Z'`);
        await queryRunner.query(`ALTER TABLE \`Coin\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-07-01T15:26:01.774Z'`);
        await queryRunner.query(`ALTER TABLE \`Balance\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-07-01T15:26:01.775Z'`);
        await queryRunner.query(`ALTER TABLE \`Balance\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-07-01T15:26:01.775Z'`);
        await queryRunner.query(`ALTER TABLE \`OTP\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-07-01T15:26:01.776Z'`);
        await queryRunner.query(`ALTER TABLE \`NextOfKin\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-07-01T15:26:01.778Z'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`NextOfKin\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-07-01T15:22:56.514Z'`);
        await queryRunner.query(`ALTER TABLE \`OTP\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-07-01T15:22:56.231Z'`);
        await queryRunner.query(`ALTER TABLE \`Balance\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-07-01T15:22:56.467Z'`);
        await queryRunner.query(`ALTER TABLE \`Balance\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-07-01T15:22:56.467Z'`);
        await queryRunner.query(`ALTER TABLE \`Coin\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-07-01T15:22:56.496Z'`);
        await queryRunner.query(`ALTER TABLE \`Coin\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-07-01T15:22:56.496Z'`);
        await queryRunner.query(`ALTER TABLE \`AdminRole\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-07-01T15:22:56.570Z'`);
        await queryRunner.query(`ALTER TABLE \`AdminRole\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-07-01T15:22:56.570Z'`);
        await queryRunner.query(`ALTER TABLE \`Admin\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-07-01T15:22:56.438Z'`);
        await queryRunner.query(`ALTER TABLE \`Admin\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-07-01T15:22:56.438Z'`);
        await queryRunner.query(`ALTER TABLE \`Transaction\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-07-01T15:22:56.439Z'`);
        await queryRunner.query(`ALTER TABLE \`Transaction\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-07-01T15:22:56.439Z'`);
        await queryRunner.query(`ALTER TABLE \`Bank\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-07-01T15:22:56.440Z'`);
        await queryRunner.query(`ALTER TABLE \`Bank\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-07-01T15:22:56.440Z'`);
        await queryRunner.query(`ALTER TABLE \`User\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-07-01T15:22:56.440Z'`);
        await queryRunner.query(`ALTER TABLE \`User\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-07-01T15:22:56.440Z'`);
        await queryRunner.query(`ALTER TABLE \`SwapPercentage\` CHANGE \`updatededAt\` \`updatededAt\` varchar(255) NOT NULL DEFAULT '2023-07-01T15:22:56.584Z'`);
        await queryRunner.query(`ALTER TABLE \`SwapPercentage\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-07-01T15:22:56.584Z'`);
        await queryRunner.query(`ALTER TABLE \`Rate\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-07-01T15:22:56.583Z'`);
        await queryRunner.query(`ALTER TABLE \`Rate\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-07-01T15:22:56.583Z'`);
    }

}
