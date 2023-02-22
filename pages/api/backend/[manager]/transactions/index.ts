import { NextApiRequest, NextApiResponse, PageConfig } from "next";

import { Transaction } from "@/app/models";

import { getCms, handleError, methodNotAllowed } from "@/lib/utils";
import { manageResource } from "@/lib/utils/resource";
import { ClientInterface } from "@/app/models/client";
import { ProductInterface } from "@/app/models/product";

export const data = async (req: NextApiRequest) => {
    const { page = 1, show = 10, search = '' } = req.query
    let total = 0

    const regex = new RegExp(search as string, 'i')

    const data = await Transaction
        .find({
            $or: [
                { 'client.name': regex },
                { 'product.title': regex },
            ]
        })
        .populate<{ client: ClientInterface, product: ProductInterface }>(['client', 'product'])
    total = data.length

    const transactions = (show === 'All' ? data :
        data.filter((_, index) => (+page - 1) * +show <= index && index < +page * +show)
    ).map(transaction => ({
        ...transaction.toObject(),
        client: transaction.client.name,
        product: transaction.product.title,
    }))

    return { transactions, total }
}

export const resource = 'transactions'
export const resourceConfig = {
    singular: 'transaction',
    fields: ['client', 'product', 'qty'],
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<unknown | { error: string }>
) {
    try {
        const cms = getCms()
        const manage = manageResource(req, res, {
            data,
            model: Transaction,
            cms, resource,
            ...resourceConfig,
        })

        if (req.method === 'GET') return manage.get()
        else if (req.method === 'POST') return manage.post({
            validate: {
                client: { required: true },
                product: { required: true },
                qty: { required: true },
            },
        })
        else methodNotAllowed(req, res)
    } catch (error) {
        handleError(res, error)
    }
}

export const config: PageConfig = {
    api: {
        bodyParser: false,
    }
}