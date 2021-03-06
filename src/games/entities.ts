import {BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId} from "typeorm";
import User from "../users/entity";
import {Move} from "./logic";

type Character = 'fighter' | 'mage' | 'archer'
type Status = 'pending' | 'started' | 'finished'

@Entity()
export class Game extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('text', {default: 'pending'})
  status: Status

  @Column('text', {nullable:true})
  winner: number

  @OneToMany(_ => Player, player => player.game, {eager:true})
  players: Player[]

}

@Entity()
export class Player extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('integer', {default: 10})
  hp: number

  @Column('text')
  character: Character

  @Column('text', {nullable:true})
  previousMove: Move | null

  @Column('text', {nullable:true})
  pendingMove: Move | null

  @ManyToOne(_ => Game, game => game.players)
  game: Game

  @ManyToOne(_ => User, user => user.players)
  user: User

  @RelationId((player: Player) => player.user)
  userId: number

}
