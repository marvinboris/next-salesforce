import { NextApiRequest, NextApiResponse } from "next";

import { data, resource, resourceConfig } from '.'

import { Appointment } from "@/app/models";

import { getCms, handleError, methodNotAllowed } from "@/lib/utils";
import { manageResource } from "@/lib/utils/resource";

const information = async () => ({})

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<unknown | { error: string }>
) {
    const slug = req.query.slug as string[]
    try {
        const cms = getCms()
        const manage = manageResource(req, res, {
            data, information,
            model: Appointment,
            cms, slug, resource,
            ...resourceConfig,
        })

        if (req.method === 'GET') {
            if (slug[0] === 'info') return manage.info()
            else return manage.show({
                keys: {
                }
            })
        } else if (req.method === 'PATCH') return manage.patch({
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
        else if (req.method === 'DELETE') return manage.delete()
        else methodNotAllowed(req, res)
    } catch (error) {
        handleError(res, error)
    }
}