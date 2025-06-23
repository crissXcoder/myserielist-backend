import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Series } from './series.entity';
import { CreateSeriesDto } from './dto/create-series.dto';
import { UpdateSeriesDto } from './dto/update-series.dto';
import { User } from '../users/user.entity';

@Injectable()
export class SeriesService {
    constructor(
        @InjectRepository(Series)
        private seriesRepo: Repository<Series>,
    ) { }

    async create(dto: CreateSeriesDto, user: User): Promise<Series> {
        const serie = this.seriesRepo.create({ ...dto, user });
        return await this.seriesRepo.save(serie);
    }

    async findAllByUser(userId: number): Promise<Series[]> {
        return await this.seriesRepo.find({
            where: { user: { id: userId } },
            order: { createdAt: 'DESC' },
        });
    }

    async findOneByIdAndUser(id: number, userId: number): Promise<Series> {
        const serie = await this.seriesRepo.findOne({
            where: { id, user: { id: userId } },
        });
        if (!serie) throw new NotFoundException('Serie no encontrada');
        return serie;
    }

    async update(id: number, dto: UpdateSeriesDto, userId: number): Promise<Series> {
        const serie = await this.findOneByIdAndUser(id, userId);
        Object.assign(serie, dto);
        return this.seriesRepo.save(serie);
    }

    async delete(id: number, userId: number): Promise<void> {
        const serie = await this.findOneByIdAndUser(id, userId);
        await this.seriesRepo.remove(serie);
    }
}
