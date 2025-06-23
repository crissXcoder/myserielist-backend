import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepo.find();
  }

  async findById(id: number): Promise<User | null> {
    return this.userRepo.findOne({ where: { id } });
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.userRepo.findOne({ where: { username } });
  }

  async create(data: CreateUserDto): Promise<User> {
    const user = this.userRepo.create(data);
    return this.userRepo.save(user);
  }

  async save(user: User): Promise<User> {
    return this.userRepo.save(user);
  }

  async update(id: number, data: UpdateUserDto): Promise<User> {
    await this.userRepo.update(id, data);
    return (await this.findById(id))!;
  }

  async delete(id: number): Promise<void> {
    await this.userRepo.delete(id);
  }
}
