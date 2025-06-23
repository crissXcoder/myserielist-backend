import {
    ArgumentMetadata,
    BadRequestException,
    Injectable,
    PipeTransform,
    ValidationPipe as NestValidationPipe,
} from '@nestjs/common';

@Injectable()
export class ValidationPipe extends NestValidationPipe {
    constructor() {
        super({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
            transformOptions: {
                enableImplicitConversion: true,
            },
        });
    }

    override async transform(value: any, metadata: ArgumentMetadata) {
        try {
            return await super.transform(value, metadata);
        } catch (error) {
            throw new BadRequestException({
                message: 'Datos inválidos',
                errors: error.response?.message || error.message,
            });
        }
    }
}
