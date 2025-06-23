import {
    Injectable,
    UnauthorizedException,
    ForbiddenException,
    NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { VerifyDto } from './dto/verify.dto';
import { User } from '../users/user.entity';
import { randomInt } from 'crypto';
import { MailService } from '../mail/mail.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private mailService: MailService,
    ) { }

    async validateUser(username: string, password: string): Promise<User> {
        const user = await this.usersService.findByUsername(username);
        if (!user || !user.isVerified)
            throw new ForbiddenException('No verificado');
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) throw new UnauthorizedException('Credenciales incorrectas');
        return user;
    }

    async login(user: User) {
        const payload = { sub: user.id, username: user.username };
        return { access_token: this.jwtService.sign(payload) };
    }

    async register(dto: RegisterDto) {
        const exists = await this.usersService.findByUsername(dto.username);
        if (exists) throw new ForbiddenException('Usuario ya existe');

        const hashed = await bcrypt.hash(dto.password, 10);
        const code = randomInt(100000, 999999).toString();

        const user = await this.usersService.create({
            ...dto,
            password: hashed,
            verificationCode: code,
        });

        await this.mailService.sendVerificationCode(user.username, code);

        return { msg: 'Usuario creado. Esperando verificación' };
    }

    async verify(dto: VerifyDto) {
        const user = await this.usersService.findByUsername(dto.username);
        if (!user) throw new NotFoundException('Usuario no encontrado');
        if (user.verificationCode !== dto.code)
            throw new ForbiddenException('Código inválido');

        user.isVerified = true;
        user.verificationCode = undefined;
        return await this.usersService.save(user);
    }
}
