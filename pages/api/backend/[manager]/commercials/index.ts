import path from 'path';

import { NextApiRequest, NextApiResponse, PageConfig } from "next";

import { Commercial } from '@/app/models';

import { getCms, handleError, methodNotAllowed } from "@/lib/utils";
import { manageResource } from '@/lib/utils/resource';

export const data = async (req: NextApiRequest) => {
    const { page = 1, show = 10, search = '' } = req.query
    let total = 0

    const regex = new RegExp(search as string, 'i')

    const data = await Commercial
        .find({
            $or: [
            ]
        })
    total = data.length

    const commercials = (show === 'All' ? data :
        data.filter((_, index) => (+page - 1) * +show <= index && index < +page * +show)
    ).map(commercial => ({ ...commercial.toObject() }))

    return { commercials, total }
}

export const uploadDir = path.join(process.cwd(), 'public', 'images', 'commercials')
export const resource = 'commercials'
export const resourceConfig = {
    singular: 'commercial',
    fields: ['name', 'username', 'password', 'phone', 'locale'],
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
            model: Commercial,
            cms, resource,
            ...resourceConfig,
        })

        if (req.method === 'GET') return manage.get()
        else if (req.method === 'POST') return manage.post({
            validate: {
                firstName: { required: true },
                lastName: { required: true },
                username: { required: true },
                password: { required: true },
                phone: { required: true },
                locale: { required: true },
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