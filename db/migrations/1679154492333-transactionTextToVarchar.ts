import { MigrationInterface, QueryRunner } from 'typeorm';

export class transactionTextToVarchar1679154492333
  implements MigrationInterface
{
  name = 'transactionTextToVarchar1679154492333';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`Rate\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-18T15:48:13.237Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Rate\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-03-18T15:48:13.237Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Admin\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-18T15:48:15.164Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Admin\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-03-18T15:48:15.164Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Transaction\` DROP COLUMN \`payoutCurrency\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`Transaction\` ADD \`payoutCurrency\` varchar(255) NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`Transaction\` DROP COLUMN \`hash\``);
    await queryRunner.query(
      `ALTER TABLE \`Transaction\` ADD \`hash\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Transaction\` DROP COLUMN \`transactionReference\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`Transaction\` ADD \`transactionReference\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Transaction\` DROP COLUMN \`withdrawalAddress\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`Transaction\` ADD \`withdrawalAddress\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Transaction\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-18T15:48:15.165Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Transaction\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-03-18T15:48:15.165Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Bank\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-18T15:48:15.167Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Bank\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-03-18T15:48:15.167Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`User\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-18T15:48:15.168Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`User\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-03-18T15:48:15.168Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Coin\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-18T15:48:15.177Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Coin\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-03-18T15:48:15.177Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`OTP\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-18T15:48:15.179Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Balance\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-18T15:48:15.181Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Balance\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-03-18T15:48:15.181Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`NextOfKin\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-18T15:48:15.182Z'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`NextOfKin\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-18T14:41:34.244Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Balance\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-03-18T14:41:34.039Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Balance\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-18T14:41:34.039Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`OTP\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-18T14:41:33.542Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Coin\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-03-18T14:41:34.188Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Coin\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-18T14:41:34.188Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`User\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-03-18T14:41:33.934Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`User\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-18T14:41:33.934Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Bank\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-03-18T14:41:33.927Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Bank\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-18T14:41:33.927Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Transaction\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-03-18T14:41:33.925Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Transaction\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-18T14:41:33.925Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Transaction\` DROP COLUMN \`withdrawalAddress\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`Transaction\` ADD \`withdrawalAddress\` text NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Transaction\` DROP COLUMN \`transactionReference\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`Transaction\` ADD \`transactionReference\` text NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`Transaction\` DROP COLUMN \`hash\``);
    await queryRunner.query(
      `ALTER TABLE \`Transaction\` ADD \`hash\` text NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Transaction\` DROP COLUMN \`payoutCurrency\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`Transaction\` ADD \`payoutCurrency\` text NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Admin\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-03-18T14:41:33.924Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Admin\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-18T14:41:33.924Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Rate\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-03-18T14:41:34.712Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Rate\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-18T14:41:34.712Z'`,
    );
    await queryRunner.query(
      `CREATE INDEX \`FK_32a6e4065ab9d7275321271d3ae\` ON \`Transaction\` (\`userId\`)`,
    );
  }
}
