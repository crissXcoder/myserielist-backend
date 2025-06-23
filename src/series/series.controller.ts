import {
    Controller, Get, Post, Put, Delete, Body,
    Param, UseGuards, ParseIntPipe,
} from '@nestjs/common';
import { SeriesService } from './series.service';
import { CreateSeriesDto } from './dto/create-series.dto';
import { UpdateSeriesDto } from './dto/update-series.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { User } from '../users/user.entity';

@UseGuards(JwtAuthGuard)
@Controller('series')
export class SeriesController {
    constructor(private readonly seriesService: SeriesService) { }

    @Post()
    create(@Body() dto: CreateSeriesDto, @CurrentUser() user: User) {
        return this.seriesService.create(dto, user);
    }

    @Get()
    findAll(@CurrentUser() user: User) {
        return this.seriesService.findAllByUser(user.id);
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: User) {
        return this.seriesService.findOneByIdAndUser(id, user.id);
    }

    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateSeriesDto,
        @CurrentUser() user: User,
    ) {
        return this.seriesService.update(id, dto, user.id);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: User) {
        return this.seriesService.delete(id, user.id);
    }
}
