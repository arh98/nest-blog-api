import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Tag {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        length: 256,
        unique: true,
    })
    name: string;

    @Column({
        type: 'varchar',
        length: 512,
        unique: true,
    })
    slug: string;

    @Column({
        type: 'text',
        nullable: true,
    })
    description: string;

    @Column({
        type: 'text',
        nullable: true,
    })
    schema: string;

    @Column({
        type: 'varchar',
        length: 1024,
        nullable: true,
    })
    featuredImage: string;

    @CreateDateColumn()
    createDate: Date;

    @UpdateDateColumn()
    updateDate: Date;

    // Add this decorartor and column enables soft delete
    @DeleteDateColumn()
    deletedAt: Date;
}
