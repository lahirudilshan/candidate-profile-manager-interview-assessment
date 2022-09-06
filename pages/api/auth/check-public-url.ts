import { checkAuth } from '@shared/utils/server/index';
import { TCommonResponse } from '@shared/types/service';
import prisma from '@lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async (
    req: NextApiRequest,
    res: NextApiResponse<TCommonResponse<boolean>>
) => {
    try {

        if (req.method !== 'POST') return res.status(405).json({ success: false, data: false, message: 'Method not allowed' });
        if (req.body && !req.body.profileURL) return res.status(400).json({ success: false, data: false, message: 'profileURL param is required' });

        const session = await checkAuth(req);

        const isAvailable = await prisma.candidate.findFirst({
            where: {
                profileURL: req.body.profileURL,
                email: {
                    not: session.user!.email as string
                }
            }
        });

        if (isAvailable) {
            return res.status(200).json({
                success: false,
                data: false,
                message: 'Entered username already taken'
            });
        } else {
            return res.status(200).json({
                success: true,
                data: true,
                message: 'Entered username available to take'
            });
        }
    } catch (error: any) {
        return res.status(400).json({
            success: false,
            data: error,
            message: 'something went wrong!'
        });
    }
}
