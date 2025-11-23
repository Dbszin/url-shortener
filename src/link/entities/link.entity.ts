import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';


@Entity('links')
export class Link {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    shortCode: string;

    @Column()
    longUrl: string;

    @Column({default: 0})
    hits: number;

 }
    