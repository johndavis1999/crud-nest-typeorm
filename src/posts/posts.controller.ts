import { Body, Controller, Delete, Get, Patch, Post, UseGuards } from "@nestjs/common";
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
    async create(@Body() post: CreatePostDto) {
        return await this.postService.store(post);
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