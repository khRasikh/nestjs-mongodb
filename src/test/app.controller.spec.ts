import { INestApplication, InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { AppService } from 'src/health/check-health.service';
import * as request from 'supertest';

describe('AppController (Integration Testing)', () => {
  let apps: INestApplication;
  let healthCheck: AppService;

  beforeAll(async () => {
    const getModule: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    apps = getModule.createNestApplication();
    healthCheck = getModule.get<AppService>(AppService);
    await apps.init();
  });

  describe('app controller should return "OK"', () => {
    test('should return OK & 200', async () => {
      const mockJest = jest
        .spyOn(healthCheck, 'checkHealth')
        .mockImplementation(() => 'OK');
      const result = await request(apps.getHttpServer()).get('/');
      expect(mockJest).toBeCalled();
      expect(result.status).toBe(200);
      expect(result.text).toBe('OK');
    });
    test('should return Internal Server Error or 500', async () => {
      const mockJest = jest
        .spyOn(healthCheck, 'checkHealth')
        .mockImplementation(() => {
          throw new InternalServerErrorException();
        });
      const result = await request(apps.getHttpServer()).get('/');
      expect(mockJest).toBeCalled();
      expect(result.status).toBe(500);
      expect(result.body.message).toEqual('Internal Server Error');
    });
  });

  afterAll(async () => {
    await apps.close();
  });
});
