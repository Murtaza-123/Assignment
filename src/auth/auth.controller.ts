import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() email: string, password: string) {
    return this.authService.signUp(email, password);
  }

  @Post('/signin')
  signIn(@Body() email: string, password: string) {
    return this.authService.signIn(email, password);
  }

  @UseGuards(AuthGuard)
  @Get('/me')
  getMe(@Request() req) {
    return req.user;
  }
}
