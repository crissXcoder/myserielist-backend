import {
    Controller, Post, Body, Req, Res, UseGuards, Get, HttpCode, UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { VerifyDto } from './dto/verify.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Request, Response } from 'express';
import { User } from '../users/user.entity';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('register')
    async register(@Body() dto: RegisterDto) {
        return await this.authService.register(dto);
    }

    @Post('verify')
    async verify(@Body() dto: VerifyDto) {
        return await this.authService.verify(dto);
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    @HttpCode(200)
    async login(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
        const user = req.user as User;
        if (!user) throw new UnauthorizedException('No autorizado');

        const jwt = await this.authService.login(user);
        res.cookie('jwt', jwt.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 604800000,
        });
        return { msg: 'Login exitoso' };
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    async me(@Req() req) {
        return req.user;
    }

    @Post('logout')
    @HttpCode(200)
    async logout(@Res({ passthrough: true }) res: Response) {
        res.clearCookie('jwt');
        return { msg: 'Sesión cerrada' };
    }
}
