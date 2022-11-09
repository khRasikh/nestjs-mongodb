import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDto } from './dto/createTask.dto';
import { Task, TaskDocument } from './task.schema';

@Injectable()
export class MongoDBService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async create(createTaskdto: CreateTaskDto): Promise<Task> {
    const createdCat = new this.taskModel(createTaskdto);
    return createdCat.save();
  }

  async findAll(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }

  async findOne(id: string): Promise<Task[]> {
    return this.taskModel.findById(id);
  }

  async updateOne(id: string): Promise<Task[]> {
    return this.taskModel.findByIdAndUpdate(id);
  }
  async deleteOne(id: string): Promise<Task[]> {
    return this.taskModel.findByIdAndDelete(id);
  }
}
