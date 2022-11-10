import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { MongoDBModule } from 'src/mongodb/mongodb.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [MongoDBModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    const mockData = {
      id: 120,
      name: 'khudadad',
      status: true,
      date: '2022-10-10',
    };
    return request(app.getHttpServer()).get('/mongodb').expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
