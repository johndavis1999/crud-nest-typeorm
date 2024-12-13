import { IsNumber } from "class-validator"

export class ImpersonateDto {
    @IsNumber()
    id_user: number
}