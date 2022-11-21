import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckResult,
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
            'http://localhost:3000/docs',
            (res) => res.status !== 404,
          ),
      ])
      .then((res) => console.log(res));
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
