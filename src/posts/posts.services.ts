import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UsersService } from "../users/users.service";
import { Post } from "./post.entity";
import { User } from "../users/user.entity";
import { Repository } from "typeorm";
import { CreatePostDto } from "./dto/create-post.dto";

@Injectable()
export class PostsService {

    constructor(
        @InjectRepository(Post) private postRepository: Repository<Post>,
        private usersService: UsersService
    ) {

    }

    getPosts() {
        return this.postRepository.find({
            relations: ['id_user']
        });
    }
    
    async store(post: CreatePostDto) {
        const userId = post.id_user.id;
        await this.usersService.findUser(userId);

        const newPost = this.postRepository.create(post);
        return await this.postRepository.save(newPost);
    }

    find() {
        
    }

    show() {
        
    }

    update() {

    }

    destroy() {
        
    }
}