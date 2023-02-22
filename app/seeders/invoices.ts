import { Client, Invoice, Method } from "../models";
import { InvoiceInterface, InvoiceStatus } from "../models/invoice";

const invoices: InvoiceInterface[] = [
    { amount: 320500, location: 'Santa Lucia - DLA, Cite Cic', number: 'INV00094318', status: InvoiceStatus.Completed },
    { amount: 568500, location: 'Carrefour - DLA, Bonamoussadi', number: 'INV00034226', status: InvoiceStatus.Pending },
    { amount: 278000, location: 'Mahima - DLA, Akwa', number: 'INV000199345', status: InvoiceStatus.Completed },
]

export default async function invoicesSeed() {
    const data = await Promise.all(invoices.map(async (invoice, index) => {
        const client = await Client.findOne({ name: ['Joseph Kamdem', 'Eulice Camrelo', 'Jarius Delamarei'][index] })
        const method = await Method.findOne({ name: ['Cash', 'Orange Money', 'Cash'][index] })
        return { ...invoice, client, method }
    }))
    await Invoice.insertMany(data)
}