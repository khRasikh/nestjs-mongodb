import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { MongoDBModule } from '../mongodb/mongodb.module';

describe('CRUD Operations with MongoDB', () => {
  let app: INestApplication;
  let mockMongoController: {
    id: 101;
    name: 'go to shopping';
    status: false;
    date: '2022-01-10';
  };

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [MongoDBModule],
    })
      .overrideProvider(mockMongoController)
      .useValue(mockMongoController)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('/mongodb GET Tasks', () => {
    const result = request(app.getHttpServer()).get('/mongodb');
    result.expect(200);
    result.expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
