import { IsBoolean, IsOptional, IsString, Length } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @Length(4, 20)
  username?: string;

  @IsOptional()
  @IsString()
  @Length(6, 50)
  password?: string;

  @IsOptional()
  @IsBoolean()
  isVerified?: boolean;

  @IsOptional()
  @IsString()
  verificationCode?: string;
}
