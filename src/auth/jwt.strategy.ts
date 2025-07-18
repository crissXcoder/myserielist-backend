import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (req) => req?.cookies?.jwt,
            ]),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET || 'secreto_seguro',
        });
    }

    async validate(payload: any) {
        return { userId: payload.sub, username: payload.username };
    }
}
