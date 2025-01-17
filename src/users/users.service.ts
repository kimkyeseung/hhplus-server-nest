import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ApiException } from 'src/common/exceptions/api-exception';
import { ApiErrors } from 'src/common/errors/api-errors';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  findAll() {
    const users = this.userRepository.find();
    return users;
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new ApiException(ApiErrors.Users.NotFound);
    }

    await this.userRepository.update(id, updateUserDto);
    return this.userRepository.findOneBy({ id });
  }

  async remove(id: number) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new ApiException(ApiErrors.Users.NotFound);
    }

    return await this.userRepository.delete({ id });
  }
}
