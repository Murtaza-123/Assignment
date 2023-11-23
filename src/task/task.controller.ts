import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskDto } from 'src/dto/task.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post('createPost')
  async createPost(@Body() taskDto: TaskDto) {
    const task = await this.taskService.createPost(taskDto);
    return task;
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('/getPost')
  async getPost(@Request() req) {
    const user = req.user;
    const posts = await this.taskService.getTasksByUserId(user.id);

    return { user, posts };
  }
}
