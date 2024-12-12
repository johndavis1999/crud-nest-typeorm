import { Controller, Get, Headers, UnauthorizedException } from '@nestjs/common';
import { PersonalAccessTokensService } from './personal-access-tokens.service';
import { User } from '../users/user.entity';

@Controller('auth')
export class AuthController {
    constructor(private readonly tokensService: PersonalAccessTokensService) {}

    @Get('verify')
    async verify(@Headers('Authorization') authorization: string): Promise<User> {
        if (!authorization || !authorization.startsWith('Bearer ')) {
            throw new UnauthorizedException('El token es requerido en el formato Bearer <token>');
        }

        // Extraer el token eliminando el prefijo 'Bearer '
        const token = authorization.split(' ')[1];

        if (!token) {
            throw new UnauthorizedException('Token no encontrado');
        }

        // Verificar el token usando el servicio
        return this.tokensService.verifyToken(token);
    }
}
