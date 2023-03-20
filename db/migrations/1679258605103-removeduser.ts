import { MigrationInterface, QueryRunner } from 'typeorm';

export class removeduser1679258605103 implements MigrationInterface {
  name = 'removeduser1679258605103';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`Rate\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:43:25.757Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Rate\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:43:25.757Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Admin\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:43:26.400Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Admin\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:43:26.400Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Transaction\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:43:26.401Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Transaction\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:43:26.401Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`User\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:43:26.406Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`User\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:43:26.406Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Bank\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:43:26.408Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Bank\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:43:26.408Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Coin\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:43:26.409Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Coin\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:43:26.409Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`OTP\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:43:26.410Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Balance\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:43:26.417Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Balance\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:43:26.417Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`NextOfKin\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:43:26.418Z'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`NextOfKin\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:43:09.029Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Balance\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:43:08.916Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Balance\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:43:08.916Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`OTP\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:43:08.760Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Coin\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:43:09.008Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Coin\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:43:09.008Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Bank\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:43:08.854Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Bank\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:43:08.854Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`User\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:43:08.860Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`User\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:43:08.860Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Transaction\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:43:08.853Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Transaction\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:43:08.853Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Admin\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:43:08.852Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Admin\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:43:08.852Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Rate\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:43:09.255Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Rate\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:43:09.255Z'`,
    );
    await queryRunner.query(
      `CREATE INDEX \`FK_32a6e4065ab9d7275321271d3ae\` ON \`Transaction\` (\`userId\`)`,
    );
  }
}
