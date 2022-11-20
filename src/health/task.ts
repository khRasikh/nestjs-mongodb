import { Injectable } from '@nestjs/common';
import {
  HealthCheckError,
  HealthIndicator,
  HealthIndicatorResult,
} from '@nestjs/terminus';

export interface ITask {
  id: number;
  name: string;
  type: string;
  date: string;
}
@Injectable()
export class TaskHealthIndicator extends HealthIndicator {
  private task: ITask[] = [
    { id: 123, name: 'shopping', type: 'daily', date: '2022-12-01' },
  ];

  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    const badTasks = this.task.filter((t) => t.type === 'daily');
    const isHealthy = badTasks.length === 0;
    console.log(isHealthy);
    const result = this.getStatus(key, isHealthy, {
      badTasks: badTasks.length,
    });
    if (isHealthy) {
      return result;
    }
    throw new HealthCheckError('Check Task Health faild!!', result);
  }
}
