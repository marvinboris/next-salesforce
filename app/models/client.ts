import { Document, Model, PopulatedDoc, Schema, Types } from "mongoose"

import { ShopInterface } from "./shop"

const directory = '/images/clients/'

export enum ClientStatus {
    Active,
    Inactive,
}

export interface ClientInterface {
    id?: string
    name: string
    location: string
    phone: string
    email: string
    status?: ClientStatus
    joinedAt?: Date
    photo?: string
    shops?: PopulatedDoc<Document<Types.ObjectId> & ShopInterface>[]
    createdAt?: Date
    updatedAt?: Date
}

export const ClientSchema = new Schema<ClientInterface, Model<ClientInterface>>({
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    phone: String,
    email: String,
    status: {
        type: Number,
        enum: [
            ClientStatus.Active,
            ClientStatus.Inactive,
        ],
        default: ClientStatus.Active,
    },
    joinedAt: Date,
    photo: {
        type: String,
        get: (photo: string) => photo === 'backend/user-pic.svg' ? `/images/${photo}` : directory + photo,
        default: 'backend/user-pic.svg'
    },
    shops: [{
        type: Types.ObjectId,
        ref: 'Shop',
    }],
}, { timestamps: true, toObject: { getters: true } })