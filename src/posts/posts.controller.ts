import { Body, Controller, Delete, Get, Patch, Post } from "@nestjs/common";
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
    create(@Body() post: CreatePostDto) {
        return this.postService.store(post);
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