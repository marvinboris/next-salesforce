import { NextApiRequest, NextApiResponse, PageConfig } from "next";

import { Invoice } from '@/app/models';
import { ClientInterface } from "@/app/models/client";
import { MethodInterface } from "@/app/models/method";

import { getCms, handleError, methodNotAllowed } from "@/lib/utils";
import { manageResource } from '@/lib/utils/resource';

export const data = async (req: NextApiRequest) => {
    const { page = 1, show = 10, search = '' } = req.query
    let total = 0

    const regex = new RegExp(search as string, 'i')

    const data = await Invoice
        .find({
            $or: [
                { 'client.name': regex },
                { 'method.name': regex },
                { number: regex },
                { location: regex },
            ]
        })
        .populate<{ client: ClientInterface, method: MethodInterface }>(['client', 'method'])
    total = data.length

    const invoices = (show === 'All' ? data :
        data.filter((_, index) => (+page - 1) * +show <= index && index < +page * +show)
    ).map(invoice => ({
        ...invoice.toObject(),
        client: invoice.client.name,
        method: invoice.method.name,
    }))

    return { invoices, total }
}

export const resource = 'invoices'
export const resourceConfig = {
    singular: 'invoice',
    fields: ['client', 'number', 'location', 'amount', 'method', 'status'],
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<unknown | { error: string }>
) {
    try {
        const cms = getCms()
        const manage = manageResource(req, res, {
            data,
            model: Invoice,
            cms, resource,
            ...resourceConfig,
        })

        if (req.method === 'GET') return manage.get()
        else if (req.method === 'POST') return manage.post({
            validate: {
                client: { isNumeric: true },
                number: { required: true },
                location: { required: true },
                amount: { required: true },
                method: { required: true },
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