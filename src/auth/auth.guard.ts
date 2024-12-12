// src/auth/auth.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PersonalAccessTokensService } from './personal-access-tokens.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private personalAccessTokensService: PersonalAccessTokensService, // Asegúrate de que este servicio esté disponible
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization'];

    if (!token) {
      return false;
    }

    const user = await this.personalAccessTokensService.verifyToken(token);
    if (!user) {
      return false;
    }

    request.user = user; // Adjuntar el usuario autenticado a la request
    return true;
  }
}
