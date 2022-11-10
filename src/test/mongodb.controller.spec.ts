import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { MongoDBModule } from 'src/mongodb/mongodb.module';
import { MongoDBService } from 'src/mongodb/mongodb.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let mongodbService: MongoDBService;

  beforeAll(async () => {
    const getTestingModule: TestingModule = await Test.createTestingModule({
      imports: [MongoDBModule],
    }).compile();

    app = getTestingModule.createNestApplication();
    mongodbService = getTestingModule.get<MongoDBService>(MongoDBService);
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

  describe('MongoDB GET URL should be accurately working', () => {
    test('should return /GET findAll: 200', async () => {
      const mockJest = jest
        .spyOn(mongodbService, 'findAll')
        .mockImplementation();
      // .mockImplementation(() => Promise.resolve(mockData));
      const result = await request(app.getHttpServer()).get('/mongodb');
      expect(mockJest).toBeCalled();
      expect(result.status).toBe(200);
    });
  });
  test('should return /POST create: success', async () => {
    const mockData = {
      id: 120,
      name: 'khudadad',
      status: true,
      date: '2022-10-10',
    };
    const mockJest = jest
      .spyOn(mongodbService, 'create')
      .mockResolvedValueOnce(mockData);
    const result = await request(app.getHttpServer()).post('/mongodb');
    expect(mockJest).toBeCalled();
    expect(result.status).toBe(201);
    expect(result.body).toMatchObject(mockData);
  });

  test('should return /PUT update: success', async () => {
    const mockData = {
      id: 120,
      name: 'khudadad',
      status: true,
      date: '2022-10-10',
    };
    const uid = '636b75e68641ba050c51bece';
    const mockJest = jest
      .spyOn(mongodbService, 'create')
      .mockResolvedValueOnce(mockData);
    const result = await request(app.getHttpServer()).put('/mongodb/' + uid);
    expect(mockJest).toBeCalled();
    expect(result.status).toBe(200);
  });

  test('should return /DELETE update: success', async () => {
    const mockData = {
      id: 120,
      name: 'khudadad',
      status: true,
      date: '2022-10-10',
    };
    const uid = '636b75e68641ba050c51bece';
    const mockJest = jest
      .spyOn(mongodbService, 'create')
      .mockResolvedValueOnce(mockData);
    const result = await request(app.getHttpServer()).delete('/mongodb/' + uid);
    expect(result.status).toBe(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
