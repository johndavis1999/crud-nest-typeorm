import { Body, Controller, Get, Query, Post, Param, Delete, Patch } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { Pagination } from 'nestjs-typeorm-paginate';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateProfileDto } from '../profiles/dto/create-profile.dto';

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) {}

    @Get()
    async index(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10
    ): Promise<Pagination<User>> {
        return this.userService.index({ page, limit });
    }

    @Get(':id')
    async show(@Param('id') id: number) {
        return this.userService.show(id);
    }
    
    @Post()
    store(@Body() newUser: CreateUserDto) {
        return this.userService.store(newUser);
    }

    @Patch(':id')
    async update(@Param('id') id: number, @Body() user: UpdateUserDto) {
        return this.userService.update(id, user);
    }

    @Delete(':id')
    async destroy(@Param('id') id: number) {
        return this.userService.destroy(id);
    }

    //profile routes
    @Post(':id/profile')
    async storeProfile(
        @Param('id') id: number,
        @Body() profile: CreateProfileDto
    ) {
        return this.userService.storeProfile(id, profile);
    }
}
