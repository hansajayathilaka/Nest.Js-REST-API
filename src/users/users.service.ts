import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../model/user.entity';
import { Repository, UpdateResult } from 'typeorm';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly authService: AuthService,
    ) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        try {
            const user = await this.userRepository.findOne({
                where: { email: createUserDto.email },
            });
            if (user) {
                throw new BadRequestException('User already exists');
            }

            const passwordHash = await this.authService.hashPassword(
                createUserDto.password,
            );
            createUserDto.password = undefined;

            const _user = await this.userRepository.save({
                ...createUserDto,
                passwordHash,
            });
            return await this.userRepository.findOneBy({ id: _user.id });
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async findAll(): Promise<User[]> {
        try {
            const users = await this.userRepository.find();
            return users;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async findOne(id: string): Promise<User> {
        try {
            const user = await this.userRepository.findOne({ where: { id } });
            return user;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async update(
        id: string,
        updateUserDto: UpdateUserDto,
    ): Promise<UpdateResult> {
        try {
            const user = await this.userRepository.findOne({ where: { id } });
            if (!user) {
                throw new NotFoundException('User not found');
            }

            const _user = await this.userRepository.update(user, updateUserDto);
            return _user;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async remove(id: string) {
        try {
            const user = await this.userRepository.findOne({ where: { id } });
            if (!user) {
                throw new NotFoundException('User not found');
            }

            const _user = await this.userRepository.remove(user);
            return _user;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}
