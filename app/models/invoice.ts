import { Model, Schema, Types } from 'mongoose'

export enum InvoiceStatus {
    Pending,
    Completed,
    Cancelled,
}

export interface InvoiceInterface {
    id?: string
    client?: Types.ObjectId
    number: string
    location: string
    amount: number
    method?: Types.ObjectId
    status?: InvoiceStatus
    createdAt?: Date
    updatedAt?: Date
}

export const InvoiceSchema = new Schema<InvoiceInterface, Model<InvoiceInterface>>({
    client: {
        type: Types.ObjectId,
        required: true,
        ref: 'Client',
    },
    number: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    method: {
        type: Types.ObjectId,
        required: true,
        ref: 'Method',
    },
    status: {
        type: Number,
        enum: [
            InvoiceStatus.Pending,
            InvoiceStatus.Completed,
            InvoiceStatus.Cancelled,
        ],
        default: InvoiceStatus.Pending,
    },
}, { timestamps: true })