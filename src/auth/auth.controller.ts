import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { SignUpDTO } from 'src/dto/signout.dto';
import { SignInDTO } from 'src/dto/signin.dto';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() signUp: SignUpDTO) {
    return this.authService.signUp(signUp);
  }

  @Post('/signin')
  signIn(@Body() signin: SignInDTO) {
    return this.authService.signIn(signin);
  }

  @UseGuards(AuthGuard)
  @Get('/getUser')
  getUser(@Request() req) {
    const user = req.user;
    return user;
  }
}
