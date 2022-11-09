import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoDBController } from './mongodb.controller';
import { MongoDBService } from './mongodb.service';
import { Task, TaskSchema } from './task.schema';

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://localhost:27017/task`),
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
  ],
  controllers: [MongoDBController],
  providers: [MongoDBService],
})
export class MongoDBModule {}
