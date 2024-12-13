import { User } from "../../users/user.entity"

export class CreatePostDto {
    title: string
    content: string
    id_user: User
}