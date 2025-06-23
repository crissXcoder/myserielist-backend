import { IsString, Length, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(4, 20)
  username: string;

  @IsString()
  @Length(6, 50)
  password: string;

  @IsOptional()
  @IsString()
  verificationCode?: string;
}
