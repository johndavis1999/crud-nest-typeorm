import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Profile } from '../profiles/profile.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { paginate, Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateProfileDto } from '../profiles/dto/create-profile.dto';

@Injectable()
export class UsersService {

    constructor( 
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Profile) private profileRepository: Repository<Profile> 
    ) {}

    async index(options: IPaginationOptions): Promise<Pagination<User>> {
        return paginate<User>(this.userRepository, options);
    }

    async findUser(id: number) {
        const user = await this.userRepository.findOne({
            where: { id },
            relations: ['posts']
        });
    
        if (!user) {
            throw new HttpException(`El usuario no existe`, HttpStatus.NOT_FOUND);
        }
    
        return user;
    }

    findByUsername (username: string) {
        return this.userRepository.findOneBy({username});
    }

    async show(id: number) {
        return this.findUser(id);
    }

    async store(user: CreateUserDto) {
        const userExist = await this.userRepository.findOne({
            where: {
                username: user.username
            }
        });
        if(userExist) {
            return new HttpException(
                `Ya existe un usuario con el username: ${user.username}`, 
                HttpStatus.CONFLICT)
        }
        const newUser = this.userRepository.create(user);
        return this.userRepository.save(newUser);
    }

    async update(id: number, user: UpdateUserDto) {
        const userExsiste = await this.findUser(id);
        const updatedUser = Object.assign(userExsiste, user);
        return this.userRepository.save(updatedUser);
    }

    async destroy(id: number) {
        await this.findUser(id);
        this.userRepository.delete({ id });
        return new HttpException(`Usuario eliminado`, HttpStatus.OK)
    }

    async storeProfile(id: number, profile: CreateProfileDto) {
        const user = await this.findUser(id);
        const newProfile = this.profileRepository.create(profile);
        const savedProfile = await this.profileRepository.save(newProfile);
        user.profile = savedProfile;
        return this.userRepository.save(user);
    }
}