import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity('user_profile')
export class Profile {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    nombre: string
    @Column()
    apellido: string
    @Column({nullable: true})
    edad: number
    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date
}