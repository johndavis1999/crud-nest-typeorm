import { Body, Controller, Delete, Get, Patch, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthUser } from 'src/auth/user.decorator';
import { User } from 'src/users/user.entity';
import { CreatePostDto } from "./dto/create-post.dto";
import { PostsService } from "./posts.services";

@Controller('posts')
export class PostsController {

    constructor(
        private postService: PostsService
    ) {}

    @Get()
    getPosts() {
        return this.postService.getPosts();
    }
    
    @Post()
    @UseGuards(AuthGuard)
    async create(@AuthUser() user: User, @Body() post: CreatePostDto) {
        console.log('Authenticated User:', user); // Inspecciona el usuario
        if (!user || !user.id) {
            throw new Error('Usuario no autenticado o sin ID válido');
        }
    
        return await this.postService.store(post, user);
    }

    @Get()
    show() {

    }
    
    @Patch()
    update() {

    }
    
    @Delete()
    destroy() {

    }
}