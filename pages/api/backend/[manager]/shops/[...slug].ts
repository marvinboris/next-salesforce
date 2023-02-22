import { NextApiRequest, NextApiResponse, PageConfig } from "next";

import { data, resource, resourceConfig } from '.';

import { Shop } from '@/app/models';

import { getCms, handleError, methodNotAllowed } from "@/lib/utils";
import { manageResource } from '@/lib/utils/resource';

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
            model: Shop,
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
        else if (req.method === 'DELETE') return manage.delete()
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