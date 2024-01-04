import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        try {
            const user = this.usersService.create(createUserDto);
            return user;
        } catch (error) {
            return error;
        }
    }

    @Get()
    findAll() {
        try {
            const users = this.usersService.findAll();
            return users;
        } catch (error) {
            return error;
        }
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        try {
            const user = this.usersService.findOne(id);
            return user;
        } catch (error) {
            return error;
        }
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        try {
            const user = this.usersService.update(id, updateUserDto);
            return user;
        } catch (error) {
            return error;
        }
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        try {
            const user = this.usersService.remove(id);
            return user;
        } catch (error) {
            return error;
        }
    }
}
