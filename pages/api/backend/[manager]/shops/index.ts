import path from 'path';

import { NextApiRequest, NextApiResponse, PageConfig } from "next";

import { Shop } from '@/app/models';

import { getCms, handleError, methodNotAllowed } from "@/lib/utils";
import { manageResource } from '@/lib/utils/resource';

export const data = async (req: NextApiRequest) => {
    const { page = 1, show = 10, search = '' } = req.query
    let total = 0

    const regex = new RegExp(search as string, 'i')

    const data = await Shop
        .find({
            $or: [
                { manager: regex },
                { name: regex },
                { location: regex },
            ]
        })
    total = data.length

    const shops = (show === 'All' ? data :
        data.filter((_, index) => (+page - 1) * +show <= index && index < +page * +show)
    ).map(shop => ({ ...shop.toObject() }))

    return { shops, total }
}

export const uploadDir = path.join(process.cwd(), 'public', 'images', 'shops')
export const resource = 'shops'
export const resourceConfig = {
    singular: 'shop',
    fields: ['manager', 'name', 'location', 'phone', 'email', 'status'],
    file: { name: 'photo', uploadDir }
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<unknown | { error: string }>
) {
    try {
        const cms = getCms()
        const manage = manageResource(req, res, {
            data,
            model: Shop,
            cms, resource,
            ...resourceConfig,
        })

        if (req.method === 'GET') return manage.get()
        else if (req.method === 'POST') return manage.post({
            validate: {
                manager: { required: true },
                name: { required: true },
                location: { required: true },
                phone: { required: true },
                email: { required: true },
                status: { required: true },
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