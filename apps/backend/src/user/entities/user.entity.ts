import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, JoinTable, ManyToMany, BeforeInsert, BeforeUpdate } from "typeorm"
import { AchievementOwned } from "../../achievement/entities/achievementOwned.entity"
import { OwnedPath } from "../../paths/entities/ownedPath.entity"
import { SocialUsers } from "../../socials/entities/socialsUsers.entity"
import { Path } from "../../paths/entities/path.entity"
import { Card } from "../../community/entities/card.entity"
import { Univercity as University } from "./university.entity"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column(
        {
            nullable: false,
        }
    )
    username: string

    @Column(
        {
            nullable: false,
        }
    )
    nickname: string

    @Column(
        {
            nullable: true,
        }
    )
    password: string

    @Column(
        {
            nullable: true,
        }
    )
    role: "admin" | "user"

    @Column(
        {
            nullable: true,
            default: "Незнайка"
        }
    )
    rank: string

    @Column(
        {
            nullable: true,
        }
    )
    refreshToken: string

    
    @Column(
        {
            nullable: true,
        }
    )
    ratingPlacement: number

    @Column(
        {
            nullable: false,
            default: false
        }
    )
    isAnalyzed: boolean
    
    @Column
    (
        {
            nullable: true
        }
    )
    grade: "8" | "9" | "10" | "11" 
    
    @Column
    (
        {
            nullable: true,
            default: 0
        }
    )
    points: number

    @Column
    (
        {
            nullable: true,
        }
    )
    avataruri: string

    //IMAGES FOR USERS

    @OneToMany(() => SocialUsers, (social) => social.user, {eager: true})
    @JoinColumn()
    socials: SocialUsers[]

    @OneToMany(() => OwnedPath, (path) => path.user, {eager: true})
    @JoinTable()
    paths: OwnedPath[]

    @ManyToMany(() => Path, (path) => path.users, {eager: true, onDelete: 'SET NULL'})
    @JoinTable()
    analysedPaths: Path[]

    @ManyToMany(() => Card, (card) => card.author, {onDelete: 'CASCADE'})
    @JoinTable()
    cards?: Card[]

    @ManyToMany(() => University, (uni) => uni.users, {onDelete: 'SET NULL'})
    @JoinTable()
    universities: University[]

    @OneToMany(() => AchievementOwned, (achievement) => achievement.user)
    @JoinColumn()
    achievements: AchievementOwned[]

    @BeforeInsert()
    @BeforeUpdate()
    updateRank()
    {
        if(this.points > 400)
        {
            this.rank = "Оракул"
        }
        else
        {
            if(this.points > 300)
            {
                this.rank = "Волшебник"
            }
            else
            {
                if(this.points > 200)
                {
                    this.rank = "Первый шар"
                }
                else
                {
                    if(this.points > 100)
                    {
                        this.rank = "Маг-самоучка"
                    }
                    else
                    {
                        this.rank = "Незнайка"
                    }
                }
            }
        }
    }
}
