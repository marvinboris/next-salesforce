import { Model, Schema } from 'mongoose'

export enum ShopStatus {
    Active,
    Inactive,
}

const directory = '/images/shops/'

export interface ShopInterface {
    manager: string
    name: string
    location: string
    phone: string
    email: string
    photo?: string
    status?: ShopStatus
    createdAt?: Date
    updatedAt?: Date
}

export const ShopSchema = new Schema<ShopInterface, Model<ShopInterface>>({
    manager: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        get: (photo: string) => photo === 'backend/user-pic.svg' ? `/images/${photo}` : directory + photo,
        default: 'backend/user-pic.svg'
    },
    status: {
        type: Number,
        enum: [
            ShopStatus.Active,
            ShopStatus.Inactive,
        ],
        default: ShopStatus.Active,
    },
})