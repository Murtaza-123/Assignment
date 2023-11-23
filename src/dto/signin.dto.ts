import { PartialType } from '@nestjs/swagger';
import { SignUpDTO } from './signout.dto';

export class SignInDTO extends PartialType(SignUpDTO) {}
