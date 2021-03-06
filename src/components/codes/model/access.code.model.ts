import { Table, Model, Column, CreatedAt, UpdatedAt, BelongsTo, ForeignKey } from "sequelize-typescript"
import { Event } from "../../event/model/event.model"

@Table
export class AccessCode extends Model<AccessCode>{

    @Column({
        allowNull: false,
        unique: false,
        validate: {
            notEmpty: true,
            len: [1, 45]
        }
    })
    code!: string

    @Column({
        allowNull: true,
        defaultValue: false
    })
    used!: boolean

    @CreatedAt
    createdAt!: Date

    @UpdatedAt
    updatedAt!: Date

    @ForeignKey(() => Event)
    @Column({
        allowNull: false
    })
    eventId!: number

    @BelongsTo(() => Event)
    event?: Event
}