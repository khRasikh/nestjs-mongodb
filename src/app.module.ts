import { Module } from '@nestjs/common';
import { MongoDBModule } from './mongodb/mongodb.module';
import { ConfigModule } from '@nestjs/config';
import { CheckHealthModule } from './health/check-health.module';

@Module({
  imports: [
    MongoDBModule,
    ConfigModule.forRoot({ isGlobal: true }),
    CheckHealthModule,
  ],
})
export class AppModule {}
