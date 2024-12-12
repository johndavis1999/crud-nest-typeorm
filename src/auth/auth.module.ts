// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonalAccessTokensService } from './personal-access-tokens.service';
import { PersonalAccessToken } from './personal-access-token.entity';
import { UsersModule } from '../users/users.module'; // Importa el módulo de usuarios

@Module({
  imports: [
    TypeOrmModule.forFeature([PersonalAccessToken]),
    UsersModule, // Importa el UsersModule
  ],
  providers: [PersonalAccessTokensService],
  exports: [PersonalAccessTokensService], // Asegúrate de exportarlo si es necesario
})
export class AuthModule {}
