import { NextApiRequest, NextApiResponse } from "next";

import { data, resource, resourceConfig } from '.'

import { Method } from "@/app/models";

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
            model: Method,
            cms, slug, resource,
            ...resourceConfig,
        })

        if (req.method === 'GET') {
            if (slug[0] === 'info') return manage.info()
            else return manage.show({
                keys: {
                    isActive: keys => keys.isActive ? '1' : '0',
                }
            })
        } else if (req.method === 'PATCH') return manage.patch({
            validate: {
                name: { required: true },
                description: { required: true },
            },
            fields: {
                isActive: fields => fields.isActive == '1',
            }
        })
        else if (req.method === 'DELETE') return manage.delete()
        else methodNotAllowed(req, res)
    } catch (error) {
        handleError(res, error)
    }
}