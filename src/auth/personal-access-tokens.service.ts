import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PersonalAccessToken } from './personal-access-token.entity';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class PersonalAccessTokensService {
    constructor(
        @InjectRepository(PersonalAccessToken)
        private tokensRepository: Repository<PersonalAccessToken>,
        private readonly usersService: UsersService,
    ) {}

    /**
     * Verifica si un token existe y obtiene el usuario asociado
     * @param token - Token a verificar
     * @returns El usuario asociado al token
     */
    async verifyToken(token: string): Promise<User> {
        token = token.split('|')[1];
        console.log(token)
        // Buscar el token en la base de datos
        const accessToken = await this.tokensRepository.findOne({
            where: { token },
        });

        if (!accessToken) {
            throw new NotFoundException('Token inválido o inexistente');
        }

        // Recuperar el ID del usuario desde tokenable_id
        const userId = accessToken.tokenable_id;

        // Buscar el usuario en el servicio de usuarios
        const user = await this.usersService.findUser(userId);

        if (!user) {
            throw new NotFoundException('Usuario asociado al token no encontrado');
        }

        return user;
    }
}
