import {BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm'
import { Exclude } from 'class-transformer';
import { MinLength, IsString, IsEmail } from 'class-validator';
import * as bcrypt from 'bcrypt'
import {Player} from "../games/entities";

@Entity()
export default class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsString()
  @MinLength(3)
  @Column('text', {nullable:false, unique:true})
  username: string

  @IsEmail()
  @Column('text', {nullable:false, unique:true})
  email: string

  @IsString()
  @MinLength(8)
  @Column('text', {nullable:false})
  @Exclude({ toPlainOnly: true })
  password: string

  @OneToMany(_ => Player, player => player.user)
  players: Player[]

  async setPassword(rawPassword: string) {
    const hash = await bcrypt.hash(rawPassword, 10)
    this.password = hash
  }

  checkPassword(rawPassword: string): Promise<boolean> {
    return bcrypt.compare(rawPassword, this.password)
  }

}
