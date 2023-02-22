import { NextApiRequest, NextApiResponse, PageConfig } from "next";

import { data, resource, resourceConfig } from '.';

import { Product } from '@/app/models';

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
            model: Product,
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
                title: { required: true },
                promo: { required: true },
                price: { isNumeric: true },
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