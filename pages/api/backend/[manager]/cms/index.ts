import { NextApiRequest, NextApiResponse } from "next";

import { getCms, handleError, methodNotAllowed } from "@/lib/utils";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<unknown | { error: string }>
) {
    try {
        const cms = getCms()
        const cmsExample = getCms(true)

        if (req.method === 'GET') return res.json({ cms, cmsExample })
        else methodNotAllowed(req, res)
    } catch (error) {
        handleError(res, error)
    }
}