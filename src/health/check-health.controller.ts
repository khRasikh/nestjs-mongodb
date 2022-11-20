import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
} from '@nestjs/terminus';
import { TaskHealthIndicator } from './task';

@Controller('check-health')
export class CheckHealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly http: HttpHealthIndicator,
    private readonly taskHealthIndicator: TaskHealthIndicator,
  ) {}

  @Get('one')
  @HealthCheck()
  getHelth() {
    return this.health.check([
      () => this.http.pingCheck('docs', 'http://localhost:3000/docs'),
    ]);
  }

  @Get('specific-response')
  @HealthCheck()
  checkSpecificResponse() {
    return this.health.check([
      () =>
        this.http.responseCheck(
          'specific-response',
          'http://localhost:3000/docs',
          (res) => res.status == 201,
        ),
    ]);
  }

  @Get('custom')
  @HealthCheck()
  checkMyHealth() {
    return this.health.check([
      // () => this.dogHealthIndicator.isHealthy('goodboy'),
      () => this.taskHealthIndicator.isHealthy('tassk'),
    ]);
  }
}
