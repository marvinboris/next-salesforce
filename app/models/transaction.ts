import { Model, Schema, Types } from 'mongoose'

export interface TransactionInterface {
    id?: string
    client?: Types.ObjectId
    product?: Types.ObjectId
    qty: number
    createdAt?: Date
    updatedAt?: Date
}

export const TransactionSchema = new Schema<TransactionInterface, Model<TransactionInterface>>({
    client: {
        type: Types.ObjectId,
        required: true,
        ref: 'Client',
    },
    product: {
        type: Types.ObjectId,
        required: true,
        ref: 'Product',
    },
    qty: {
        type: Number,
        required: true,
    },
}, { timestamps: true })