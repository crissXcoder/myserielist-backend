import { IsString, Length } from 'class-validator';

export class VerifyDto {
    @IsString()
    username: string;

    @IsString()
    @Length(6, 6)
    code: string;
}
