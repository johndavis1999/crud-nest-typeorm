import { User } from "src/users/user.entity"

export class CreatePostDto {
    title: string
    content: string
    id_user: User
}