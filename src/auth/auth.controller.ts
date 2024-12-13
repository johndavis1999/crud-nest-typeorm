import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';
import { ImpersonateDto } from './dto/impersonate.dto';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) {}

    @Get('logged')
    @UseGuards(AuthGuard)
    index(
        @Request()
        req
    ) {
        return req.user;
    }

    @Post('register')
    register(
        @Body() 
        registerDto: RegisterDto
    ) {
        return this.authService.register(registerDto);
    }

    @Post('login')
    login(
        @Body()
        loginDto: LoginDto
    ) {
        return this.authService.login(loginDto);
    }

    @Post('impersonate')
    impersonate(
        @Body()
        id_user: ImpersonateDto
    ) {
        return this.authService.impersonate(id_user);
    }
}