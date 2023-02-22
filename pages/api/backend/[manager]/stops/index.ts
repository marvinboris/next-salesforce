import { NextApiRequest, NextApiResponse, PageConfig } from "next";

import { Stop } from '@/app/models';

import { getCms, handleError, methodNotAllowed } from "@/lib/utils";
import { manageResource } from '@/lib/utils/resource';

export const data = async (req: NextApiRequest) => {
    const { page = 1, show = 10, search = '' } = req.query
    let total = 0

    const regex = new RegExp(search as string, 'i')

    const data = await Stop
        .find({
            $or: [
                { location: regex },
                { reason: regex },
                // { startTime: regex },
                // { endTime: regex },
            ]
        })
    total = data.length

    const stops = (show === 'All' ? data :
        data.filter((_, index) => (+page - 1) * +show <= index && index < +page * +show)
    ).map(stop => ({ ...stop.toObject() }))

    return { stops, total }
}

export const resource = 'stops'
export const resourceConfig = {
    singular: 'stop',
    fields: ['location', 'reason', 'startTime', 'endTime'],
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<unknown | { error: string }>
) {
    try {
        const cms = getCms()
        const manage = manageResource(req, res, {
            data,
            model: Stop,
            cms, resource,
            ...resourceConfig,
        })

        if (req.method === 'GET') return manage.get()
        else if (req.method === 'POST') return manage.post({
            validate: {
                location: { required: true },
                reason: { required: true },
                startTime: { required: true },
                endTime: { required: true },
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