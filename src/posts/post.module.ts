import { Module } from "@nestjs/common";
import { PostsService } from "./posts.services";
import { PostsController } from "./posts.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Post } from "./post.entity";
import { UsersModule } from "src/users/users.module";
import { AuthModule } from '../auth/auth.module';

 @Module({
   imports: [
      TypeOrmModule.forFeature([Post]),
      UsersModule,
      AuthModule
   ],
   providers: [PostsService],
   controllers: [PostsController]
 })
 export class PostModule{}