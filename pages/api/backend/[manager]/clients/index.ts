import path from 'path';

import { NextApiRequest, NextApiResponse, PageConfig } from "next";

import { Client } from '@/app/models';

import { getCms, handleError, methodNotAllowed } from "@/lib/utils";
import { manageResource } from '@/lib/utils/resource';

export const data = async (req: NextApiRequest) => {
    const { page = 1, show = 10, search = '' } = req.query
    let total = 0

    const regex = new RegExp(search as string, 'i')

    const data = await Client
        .find({
            $or: [
                { title: regex },
                { description: regex },
                { body: regex },
            ]
        })
    total = data.length

    const clients = (show === 'All' ? data :
        data.filter((_, index) => (+page - 1) * +show <= index && index < +page * +show)
    ).map(client => ({ ...client.toObject() }))

    return { clients, total }
}

export const uploadDir = path.join(process.cwd(), 'public', 'images', 'clients')
export const resource = 'clients'
export const resourceConfig = {
    singular: 'client',
    fields: ['name', 'location', 'phone', 'email', 'status', 'joinedAt'],
    file: { name: 'photo', uploadDir }
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<unknown | { error: string }>
) {
    // const type = req.query.manager as string

    try {
        const cms = getCms()
        // const manager = await getAccount(req)
        const manage = manageResource(req, res, {
            data,
            model: Client,
            cms, resource,
            ...resourceConfig,
        })

        if (req.method === 'GET') return manage.get()
        else if (req.method === 'POST') return manage.post({
            validate: {
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