import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1753355588994 implements MigrationInterface {
    name = 'InitialMigration1753355588994'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying NOT NULL, "password" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "genres" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(100) NOT NULL, "slug" character varying(100) NOT NULL, "description" text, CONSTRAINT "UQ_d1cbe4fe39bdfc77c76e94eada5" UNIQUE ("slug"), CONSTRAINT "PK_80ecd718f0f00dde5d77a9be842" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "authors" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "middleName" character varying, "fullName" character varying NOT NULL, "slug" character varying NOT NULL, "bio" text, CONSTRAINT "PK_d2ed02fabd9b52847ccb85e6b88" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "books" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "description" character varying NOT NULL, "publicationDate" TIMESTAMP NOT NULL, "language" character varying(2) NOT NULL, "pages" integer NOT NULL, "slug" character varying NOT NULL, CONSTRAINT "PK_f3f2f25a099d24e12545b70b022" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "refresh_token_entity" ("id" SERIAL NOT NULL, "token" character varying NOT NULL, "expiresAt" TIMESTAMP NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_a78813e06745b2c5d5b9776bfcf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "books_genres_genres" ("booksId" integer NOT NULL, "genresId" integer NOT NULL, CONSTRAINT "PK_5773bf45b53a35762fd16cc97a0" PRIMARY KEY ("booksId", "genresId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e1c8b5fb4c9afac80b2591b0c8" ON "books_genres_genres" ("booksId") `);
        await queryRunner.query(`CREATE INDEX "IDX_8d2218df7344c443d9ded15492" ON "books_genres_genres" ("genresId") `);
        await queryRunner.query(`CREATE TABLE "books_authors_authors" ("booksId" integer NOT NULL, "authorsId" integer NOT NULL, CONSTRAINT "PK_21cf65fb7b849bd3abd2c81cf4c" PRIMARY KEY ("booksId", "authorsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_25a2cff0aa5b6d28dfbfd1f40c" ON "books_authors_authors" ("booksId") `);
        await queryRunner.query(`CREATE INDEX "IDX_5869907ade47c42570389388d2" ON "books_authors_authors" ("authorsId") `);
        await queryRunner.query(`ALTER TABLE "refresh_token_entity" ADD CONSTRAINT "FK_ebf65cd067163c7c66baa3da1c1" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "books_genres_genres" ADD CONSTRAINT "FK_e1c8b5fb4c9afac80b2591b0c84" FOREIGN KEY ("booksId") REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "books_genres_genres" ADD CONSTRAINT "FK_8d2218df7344c443d9ded154921" FOREIGN KEY ("genresId") REFERENCES "genres"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "books_authors_authors" ADD CONSTRAINT "FK_25a2cff0aa5b6d28dfbfd1f40ca" FOREIGN KEY ("booksId") REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "books_authors_authors" ADD CONSTRAINT "FK_5869907ade47c42570389388d25" FOREIGN KEY ("authorsId") REFERENCES "authors"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "books_authors_authors" DROP CONSTRAINT "FK_5869907ade47c42570389388d25"`);
        await queryRunner.query(`ALTER TABLE "books_authors_authors" DROP CONSTRAINT "FK_25a2cff0aa5b6d28dfbfd1f40ca"`);
        await queryRunner.query(`ALTER TABLE "books_genres_genres" DROP CONSTRAINT "FK_8d2218df7344c443d9ded154921"`);
        await queryRunner.query(`ALTER TABLE "books_genres_genres" DROP CONSTRAINT "FK_e1c8b5fb4c9afac80b2591b0c84"`);
        await queryRunner.query(`ALTER TABLE "refresh_token_entity" DROP CONSTRAINT "FK_ebf65cd067163c7c66baa3da1c1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5869907ade47c42570389388d2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_25a2cff0aa5b6d28dfbfd1f40c"`);
        await queryRunner.query(`DROP TABLE "books_authors_authors"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8d2218df7344c443d9ded15492"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e1c8b5fb4c9afac80b2591b0c8"`);
        await queryRunner.query(`DROP TABLE "books_genres_genres"`);
        await queryRunner.query(`DROP TABLE "refresh_token_entity"`);
        await queryRunner.query(`DROP TABLE "books"`);
        await queryRunner.query(`DROP TABLE "authors"`);
        await queryRunner.query(`DROP TABLE "genres"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
