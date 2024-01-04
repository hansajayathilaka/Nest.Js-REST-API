import {
    Body,
    Controller,
    Post,
    UseGuards,
    Request,
    HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { ApiBody, ApiOkResponse, refs } from '@nestjs/swagger';
import { RefreshJwtGuard } from './guards/refresh-jwt.guard';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { TokenResponseDto } from './dto/token-response.dto';
import { User } from '../model/user.entity';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UsersService,
    ) {}

    @ApiBody({ type: LoginDto })
    @ApiOkResponse({
        schema: {
            allOf: refs(User, TokenResponseDto),
        },
    })
    @HttpCode(200)
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return await this.authService.login(req.user);
    }

    @ApiBody({ type: CreateUserDto })
    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) {
        return await this.userService.create(createUserDto);
    }

    @ApiBody({ type: RefreshTokenDto })
    @UseGuards(RefreshJwtGuard)
    @Post('refresh')
    async refreshToken(@Request() req) {
        return await this.authService.refresh(req.user);
    }
}
