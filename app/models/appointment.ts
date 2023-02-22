import { Model, Schema, Types } from 'mongoose'

export enum AppointmentStatus {
    Incoming,
    Done,
    Cancelled,
}

export interface AppointmentInterface {
    id?: string
    client?: Types.ObjectId
    shop?: Types.ObjectId
    date: Date
    object: string
    location: string
    company: string
    status?: AppointmentStatus
    createdAt?: Date
    updatedAt?: Date
}

export const AppointmentSchema = new Schema<AppointmentInterface, Model<AppointmentInterface>>({
    client: {
        type: Types.ObjectId,
        required: true,
        ref: 'Client',
    },
    shop: {
        type: Types.ObjectId,
        required: true,
        ref: 'Shop',
    },
    date: {
        type: Date,
        required: true,
    },
    object: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    status: {
        type: Number,
        enum: [
            AppointmentStatus.Incoming,
            AppointmentStatus.Done,
            AppointmentStatus.Cancelled,
        ],
        default: AppointmentStatus.Incoming,
    }
}, { timestamps: true })