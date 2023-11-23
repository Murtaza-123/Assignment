import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskDto } from 'src/dto/task.dto';
import { Task } from 'src/models/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async createPost(taskDto: TaskDto) {
    const { name, user } = taskDto;
    const task = new Task();
    task.name = name;
    task.user = user;
    return await this.taskRepository.save(task);
  }
  async getTasksByUserId(userId: number): Promise<Task[]> {
    return this.taskRepository.find({ where: { user: { id: userId } } });
  }
}
