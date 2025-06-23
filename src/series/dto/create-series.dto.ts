import {
    IsString, IsNotEmpty, IsEnum, IsNumber,
    Min, Max, IsOptional, IsBoolean, IsArray, ArrayNotEmpty,
} from 'class-validator';
import { EstadoSerie } from '../series.entity';

export class CreateSeriesDto {
    @IsString()
    @IsNotEmpty()
    titulo: string;

    @IsString()
    @IsNotEmpty()
    plataforma: string;

    @IsNumber()
    @Min(1)
    @Max(5)
    estrellas: number;

    @IsEnum(EstadoSerie)
    estado: EstadoSerie;

    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true })
    categorias: string[];

    @IsOptional()
    @IsString()
    comentario?: string;

    @IsOptional()
    fecha?: Date;

    @IsOptional()
    @IsBoolean()
    incluyeHora?: boolean;

    @IsOptional()
    @IsBoolean()
    tieneFechaFinal?: boolean;
}
