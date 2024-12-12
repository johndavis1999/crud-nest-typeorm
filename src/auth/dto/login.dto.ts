import { Transform } from "class-transformer"
import { IsString, MinLength } from "class-validator"

export class LoginDto {
    @Transform(({value}) => value.trim())
    @IsString()
    username: string
    @Transform(({value}) => value.trim())
    @IsString()
    @MinLength(8)
    password: string
}