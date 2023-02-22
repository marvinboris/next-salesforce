import { Model, Schema, Types } from 'mongoose'

export interface ProductInterface {
    id?: string
    title: string
    price: number
    promo?: Types.ObjectId
    createdAt?: Date
    updatedAt?: Date
}

export const ProductSchema = new Schema<ProductInterface, Model<ProductInterface>>({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    promo: {
        type: Types.ObjectId,
        ref: 'Promo',
    },
}, { timestamps: true })