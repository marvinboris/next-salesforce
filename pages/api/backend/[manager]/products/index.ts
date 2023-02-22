import { NextApiRequest, NextApiResponse, PageConfig } from "next";

import { Product } from '@/app/models';

import { getCms, handleError, methodNotAllowed } from "@/lib/utils";
import { manageResource } from '@/lib/utils/resource';

export const data = async (req: NextApiRequest) => {
    const { page = 1, show = 10, search = '' } = req.query
    let total = 0

    const regex = new RegExp(search as string, 'i')

    const data = await Product
        .find({
            $or: [
                { title: regex },
                // { promo: regex },
            ]
        })
    total = data.length

    const products = (show === 'All' ? data :
        data.filter((_, index) => (+page - 1) * +show <= index && index < +page * +show)
    ).map(product => ({ ...product.toObject() }))

    return { products, total }
}

export const resource = 'products'
export const resourceConfig = {
    singular: 'product',
    fields: ['title', 'promo', 'price'],
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<unknown | { error: string }>
) {
    try {
        const cms = getCms()
        const manage = manageResource(req, res, {
            data,
            model: Product,
            cms, resource,
            ...resourceConfig,
        })

        if (req.method === 'GET') return manage.get()
        else if (req.method === 'POST') return manage.post({
            validate: {
                title: { required: true },
                promo: { required: true },
                price: { isNumeric: true },
            },
            fields: {
            }
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