import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UsersService } from "src/users/users.service";
import { Post } from "./post.entity";
import { Repository } from "typeorm";

@Injectable()
export class PostsService {

    constructor(
        @InjectRepository(Post) private postRepository: Repository<Post>,
        private usersService: UsersService
    ) {

    }

    index() {

    }
    
    store() {

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