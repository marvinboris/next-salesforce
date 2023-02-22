import { Client, Product, Transaction } from "../models";
import { TransactionInterface } from "../models/transaction";

const transactions: TransactionInterface[] = [
    { qty: 4 },
    { qty: 23 },
    { qty: 19 },
]

export default async function transactionsSeed() {
    const data = await Promise.all(transactions.map(async (transaction, index) => {
        const client = await Client.findOne({ name: ['Mr. John Doe', 'Alvina Doniato', 'Kamdem Geraldo'][index] })
        const product = await Product.findOne({ title: ['Martina Chocolate 1kg', 'White Chocolate (Vanila)', 'Cocoa Butter with peanuts'][index] })
        return { ...transaction, client, product }
    }))
    await Transaction.insertMany(data)
}