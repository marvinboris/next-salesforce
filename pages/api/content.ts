import { NextApiRequest, NextApiResponse } from "next";

import ApiMessageType from "../../app/types/api/message";

import { getCms, handleError } from "../../lib/utils";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<unknown | ApiMessageType>
) {
    try {
        const cms = getCms()

        res.json({ cms })
    } catch (error) {
        handleError(res, error)
    }
}