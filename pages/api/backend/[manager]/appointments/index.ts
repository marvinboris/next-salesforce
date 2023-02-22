import { NextApiRequest, NextApiResponse, PageConfig } from "next";

import { Appointment } from "@/app/models";
import { ClientInterface } from "@/app/models/client";
import { ShopInterface } from "@/app/models/shop";

import { getCms, handleError, methodNotAllowed } from "@/lib/utils";
import { manageResource } from "@/lib/utils/resource";

export const data = async (req: NextApiRequest) => {
    const { page = 1, show = 10, search = '' } = req.query
    let total = 0

    const regex = new RegExp(search as string, 'i')

    const data = await Appointment
        .find({
            $or: [
                { 'client.name': regex },
                { 'shop.name': regex },
                { location: regex },
                { company: regex },
            ]
        })
        .populate<{ client: ClientInterface, shop: ShopInterface }>(['client', 'shop'])
    total = data.length

    const appointments = (show === 'All' ? data :
        data.filter((_, index) => (+page - 1) * +show <= index && index < +page * +show)
    ).map(appointment => ({
        ...appointment.toObject(),
        client: appointment.client.name,
        shop: appointment.shop.name,
    }))

    return { appointments, total }
}

export const resource = 'appointments'
export const resourceConfig = {
    singular: 'appointment',
    fields: ['client', 'shop', 'date', 'location', 'object', 'company', 'status'],
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<unknown | { error: string }>
) {
    try {
        const cms = getCms()
        const manage = manageResource(req, res, {
            data,
            model: Appointment,
            cms, resource,
            ...resourceConfig,
        })

        if (req.method === 'GET') return manage.get()
        else if (req.method === 'POST') return manage.post({
            validate: {
                client: { required: true },
                shop: { required: true },
                date: { required: true },
                location: { required: true },
                object: { required: true },
                company: { required: true },
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