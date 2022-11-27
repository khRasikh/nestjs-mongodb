import { Controller, Get, Logger } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
  HttpHealthIndicator,
  MongooseHealthIndicator,
} from '@nestjs/terminus';
import { TaskHealthIndicator } from './task';

@Controller('check-health')
export class CheckHealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly http: HttpHealthIndicator,
    private readonly taskHealthIndicator: TaskHealthIndicator,
    private readonly mongooseHealth: MongooseHealthIndicator,
  ) {}

  @Get('one')
  @HealthCheck()
  getHelth(): Promise<HealthCheckResult> {
    return this.health.check([
      () => this.http.pingCheck('docs', 'http://localhost:3000/docs'),
    ]);
  }

  @Get('specific-response')
  @HealthCheck()
  async checkSpecificResponse() {
    const result = this.health
      .check([
        () =>
          this.http.responseCheck(
            'specific-response',
            'http://localhost:3000/docs',
            (res) => res.status == 200,
          ),
        () =>
          this.http.responseCheck(
            'docs',
            'https://bff.dev.medlify.com/docs',
            (res) => res.status !== 404,
          ),
        () => this.mongooseHealth.pingCheck('mongoDB'),
      ])
      .then((res) => Logger.log(res.status))
      .catch((err) => {
        Logger.error(err);
      });
    return result;
  }

  @Get('custom')
  @HealthCheck()
  checkMyHealth() {
    return this.health.check([
      () => this.taskHealthIndicator.isHealthy('task'),
    ]);
  }
}
