import { MigrationInterface, QueryRunner } from "typeorm";

export class verrification1684569950015 implements MigrationInterface {
    name = 'verrification1684569950015'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Rate\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-05-20T08:05:51.216Z'`);
        await queryRunner.query(`ALTER TABLE \`Rate\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-05-20T08:05:51.216Z'`);
        await queryRunner.query(`ALTER TABLE \`Notification\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT 'Sat May 20 2023'`);
        await queryRunner.query(`ALTER TABLE \`SwapPercentage\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-05-20T08:05:51.219Z'`);
        await queryRunner.query(`ALTER TABLE \`SwapPercentage\` CHANGE \`updatededAt\` \`updatededAt\` varchar(255) NOT NULL DEFAULT '2023-05-20T08:05:51.219Z'`);
        await queryRunner.query(`ALTER TABLE \`VerificationDetails\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT 'Sat May 20 2023'`);
        await queryRunner.query(`ALTER TABLE \`VerificationDetails\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT 'Sat May 20 2023'`);
        await queryRunner.query(`ALTER TABLE \`User\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-05-20T08:05:51.938Z'`);
        await queryRunner.query(`ALTER TABLE \`User\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-05-20T08:05:51.938Z'`);
        await queryRunner.query(`ALTER TABLE \`Bank\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-05-20T08:05:51.940Z'`);
        await queryRunner.query(`ALTER TABLE \`Bank\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-05-20T08:05:51.940Z'`);
        await queryRunner.query(`ALTER TABLE \`Transaction\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-05-20T08:05:51.941Z'`);
        await queryRunner.query(`ALTER TABLE \`Transaction\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-05-20T08:05:51.941Z'`);
        await queryRunner.query(`ALTER TABLE \`Admin\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-05-20T08:05:51.942Z'`);
        await queryRunner.query(`ALTER TABLE \`Admin\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-05-20T08:05:51.942Z'`);
        await queryRunner.query(`ALTER TABLE \`AdminRole\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-05-20T08:05:51.943Z'`);
        await queryRunner.query(`ALTER TABLE \`AdminRole\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-05-20T08:05:51.943Z'`);
        await queryRunner.query(`ALTER TABLE \`Coin\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-05-20T08:05:51.944Z'`);
        await queryRunner.query(`ALTER TABLE \`Coin\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-05-20T08:05:51.944Z'`);
        await queryRunner.query(`ALTER TABLE \`OTP\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-05-20T08:05:51.947Z'`);
        await queryRunner.query(`ALTER TABLE \`Balance\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-05-20T08:05:51.948Z'`);
        await queryRunner.query(`ALTER TABLE \`Balance\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-05-20T08:05:51.948Z'`);
        await queryRunner.query(`ALTER TABLE \`NextOfKin\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-05-20T08:05:51.949Z'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`NextOfKin\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-05-18T13:43:16.347Z'`);
        await queryRunner.query(`ALTER TABLE \`Balance\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-05-18T13:43:16.347Z'`);
        await queryRunner.query(`ALTER TABLE \`Balance\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-05-18T13:43:16.347Z'`);
        await queryRunner.query(`ALTER TABLE \`OTP\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-05-18T13:43:16.346Z'`);
        await queryRunner.query(`ALTER TABLE \`Coin\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-05-18T13:43:16.343Z'`);
        await queryRunner.query(`ALTER TABLE \`Coin\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-05-18T13:43:16.343Z'`);
        await queryRunner.query(`ALTER TABLE \`AdminRole\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-05-18T13:43:16.342Z'`);
        await queryRunner.query(`ALTER TABLE \`AdminRole\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-05-18T13:43:16.342Z'`);
        await queryRunner.query(`ALTER TABLE \`Admin\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-05-18T13:43:16.342Z'`);
        await queryRunner.query(`ALTER TABLE \`Admin\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-05-18T13:43:16.342Z'`);
        await queryRunner.query(`ALTER TABLE \`Transaction\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-05-18T13:43:16.341Z'`);
        await queryRunner.query(`ALTER TABLE \`Transaction\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-05-18T13:43:16.341Z'`);
        await queryRunner.query(`ALTER TABLE \`Bank\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-05-18T13:43:16.341Z'`);
        await queryRunner.query(`ALTER TABLE \`Bank\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-05-18T13:43:16.341Z'`);
        await queryRunner.query(`ALTER TABLE \`User\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-05-18T13:43:16.339Z'`);
        await queryRunner.query(`ALTER TABLE \`User\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-05-18T13:43:16.339Z'`);
        await queryRunner.query(`ALTER TABLE \`VerificationDetails\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT 'Thu May 18 2023'`);
        await queryRunner.query(`ALTER TABLE \`VerificationDetails\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT 'Thu May 18 2023'`);
        await queryRunner.query(`ALTER TABLE \`SwapPercentage\` CHANGE \`updatededAt\` \`updatededAt\` varchar(255) NOT NULL DEFAULT '2023-05-18T13:43:15.512Z'`);
        await queryRunner.query(`ALTER TABLE \`SwapPercentage\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-05-18T13:43:15.512Z'`);
        await queryRunner.query(`ALTER TABLE \`Notification\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT 'Thu May 18 2023'`);
        await queryRunner.query(`ALTER TABLE \`Rate\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-05-18T13:43:15.511Z'`);
        await queryRunner.query(`ALTER TABLE \`Rate\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-05-18T13:43:15.511Z'`);
    }

}
