import { NextApiRequest, NextApiResponse } from "next";

import { Product, Client, Transaction, User } from "@/app/models";

import { getAccount, getCms, handleError } from "@/lib/utils";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<unknown | { error: string }>
) {
    try {
        const cms = getCms()
        const manager = await getAccount(req)

        const users = await User.count()
        const transactions = await Transaction.count()
        const clients = await Client.count()
        const products = await Product.count()

        res.json({
            blocks: { users, transactions, clients, products },
        })
    } catch (error) {
        handleError(res, error)
    }
}