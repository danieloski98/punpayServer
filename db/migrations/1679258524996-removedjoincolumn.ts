import { MigrationInterface, QueryRunner } from 'typeorm';

export class removedjoincolumn1679258524996 implements MigrationInterface {
  name = 'removedjoincolumn1679258524996';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`Rate\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:42:06.832Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Rate\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:42:06.832Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Admin\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:42:08.690Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Admin\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:42:08.690Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Transaction\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:42:08.691Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Transaction\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:42:08.691Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Bank\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:42:08.693Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Bank\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:42:08.693Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`User\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:42:08.695Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`User\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:42:08.695Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Coin\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:42:08.701Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Coin\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:42:08.701Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`OTP\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:42:08.784Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Balance\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:42:08.807Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Balance\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:42:08.807Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`NextOfKin\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:42:08.810Z'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`NextOfKin\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:41:07.345Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Balance\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:41:07.314Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Balance\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:41:07.314Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`OTP\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:41:07.229Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Coin\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:41:07.330Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Coin\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:41:07.330Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`User\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:41:07.296Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`User\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:41:07.296Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Bank\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:41:07.293Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Bank\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:41:07.293Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Transaction\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:41:07.292Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Transaction\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:41:07.292Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Admin\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:41:07.291Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Admin\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:41:07.291Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Rate\` CHANGE \`updatedAt\` \`updatedAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:41:07.406Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Rate\` CHANGE \`createdAt\` \`createdAt\` varchar(255) NOT NULL DEFAULT '2023-03-19T20:41:07.406Z'`,
    );
    await queryRunner.query(
      `CREATE INDEX \`FK_1fed070021bff9baa1e8599dd86\` ON \`Transaction\` (\`bankId\`)`,
    );
  }
}
