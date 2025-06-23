import {
    Entity, PrimaryGeneratedColumn, Column, ManyToOne,
    CreateDateColumn, UpdateDateColumn, Check
} from 'typeorm';
import { User } from '../users/user.entity';

export enum EstadoSerie {
    POR_VER = 'por_ver',
    EN_PROGRESO = 'en_progreso',
    TERMINADA = 'terminada',
}

@Entity()
@Check('"estrellas" >= 1 AND "estrellas" <= 5')
export class Series {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    titulo: string;

    @Column()
    plataforma: string;

    @Column()
    estrellas: number;

    @Column({
        type: 'enum',
        enum: EstadoSerie,
    })
    estado: EstadoSerie;

    @Column({ type: 'simple-array' })
    categorias: string[];

    @Column({ type: 'text', nullable: true })
    comentario: string;

    @Column({ type: 'datetime', nullable: true })
    fecha: Date;

    @Column({ default: false })
    incluyeHora: boolean;

    @Column({ default: false })
    tieneFechaFinal: boolean;

    @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
    user: User;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
