import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('personal_access_tokens') // Nombre de la tabla en la base de datos
export class PersonalAccessToken {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    tokenable_type: string;

    @Column()
    tokenable_id: number;

    @Column()
    token: string;
}
