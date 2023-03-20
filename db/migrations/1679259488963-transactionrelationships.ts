import { MigrationInterface, QueryRunner } from 'typeorm';

export class transactionrelationships1679259488963
  implements MigrationInterface
{
  name = 'transactionrelationships1679259488963';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`Rate\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:58:09.599Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Rate\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:58:09.599Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Admin\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:58:10.370Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Admin\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:58:10.370Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Transaction\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:58:10.372Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Transaction\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:58:10.372Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Bank\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:58:10.376Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Bank\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:58:10.376Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`User\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:58:10.377Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`User\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:58:10.377Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Coin\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:58:10.380Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Coin\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:58:10.380Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`OTP\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:58:10.386Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Balance\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:58:10.387Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Balance\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:58:10.387Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`NextOfKin\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:58:10.388Z'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`NextOfKin\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:57:35.702Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Balance\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:57:35.583Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Balance\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:57:35.583Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`OTP\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:57:35.164Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Coin\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:57:35.675Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Coin\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:57:35.675Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`User\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:57:35.501Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`User\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:57:35.501Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Bank\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:57:35.497Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Bank\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:57:35.497Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Transaction\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:57:35.495Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Transaction\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:57:35.495Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Admin\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:57:35.494Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Admin\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:57:35.494Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Rate\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:57:35.934Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Rate\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:57:35.934Z'`,
    );
  }
}
