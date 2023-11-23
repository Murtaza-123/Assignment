import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { SignInDTO } from 'src/dto/signin.dto';
import { SignUpDTO } from 'src/dto/signout.dto';
import { User } from 'src/models/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async signUp(signUpDTO: SignUpDTO): Promise<User> {
    const { password } = signUpDTO;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User();
    user.password = hashedPassword;
    user.email = signUpDTO.email;
    return await this.userRepository.save(user);
  }

  async signIn(signin: SignInDTO): Promise<any> {
    const { email, password } = signin;
    const user = await this.userRepository.findOne({
      where: { email: email },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { email: user.email, id: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
