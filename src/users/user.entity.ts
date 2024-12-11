import { Post } from "src/posts/post.entity";
import { Profile } from "src/profiles/profile.entity";
import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number
    
    @Column({unique: true})
    username: string

    @Column()
    password: string

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date

    @Column({nullable: true})
    authStrategy: string

    @OneToOne(() => Profile)
    @JoinColumn()
    profile: Profile

    @OneToMany(() => Post, post => post.id_user)
    posts: Post[]

}