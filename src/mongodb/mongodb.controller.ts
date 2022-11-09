import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/createTask.dto';
import { MongoDBService } from './mongodb.service';
import { Task } from './task.schema';

@Controller('mongodb')
export class MongoDBController {
  constructor(private readonly mongoDB: MongoDBService) {}

  @Post()
  async createTask(@Body() createData: CreateTaskDto) {
    return this.mongoDB.create(createData);
  }

  @Get()
  getAll(): Promise<Task[]> {
    return this.mongoDB.findAll();
  }

  @Get(':id')
  getSingle(@Param('id') id: string): Promise<Task[]> {
    return this.mongoDB.findOne(id);
  }

  @Put(':id')
  updateSingle(@Param('id') id: string): Promise<Task[]> {
    return this.mongoDB.updateOne(id);
  }

  @Delete(':id')
  deleteSingle(@Param('id') id: string): Promise<Task[]> {
    return this.mongoDB.deleteOne(id);
  }
}
