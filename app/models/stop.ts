import { Model, Schema } from 'mongoose'

export interface StopInterface {
    id?: string
    location: string
    reason: string
    startTime: Date
    endTime?: Date
    createdAt?: Date
    updatedAt?: Date
}

export const StopSchema = new Schema<StopInterface, Model<StopInterface>>({
    location: {
        type: String,
        required: true,
    },
    reason: {
        type: String,
        required: true,
    },
    startTime: {
        type: Date,
        required: true,
    },
    endTime: Date,
}, { timestamps: true })