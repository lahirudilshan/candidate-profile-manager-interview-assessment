import { WorkExperience } from '@prisma/client';
import prisma from 'lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import { checkAuth } from '@shared/utils/server';
import { TCommonResponse } from '@shared/types/service';

export default async (
    req: NextApiRequest,
    res: NextApiResponse<TCommonResponse<WorkExperience | null | Record<string, string>[]>>
) => {
    try {
        if (req.method !== 'POST') return res.status(405).json({ success: false, data: null, message: 'Method not allowed' });
        if (req.body && !req.body.candidateId) return res.status(400).json({ success: false, data: null, message: 'candidateId param is required' })

        const session = await checkAuth(req);

        const company = await prisma.workExperience.findFirst({
            where: {
                candidateId: req.body.candidateId
            },
            include: {
                company: true
            }
        });

        if (company) {
            return res.status(200).json({
                success: true,
                data: company,
                message: 'User info successfully fetched!'
            });
        } else {
            return res.status(500).json({
                success: false,
                data: [],
                message: 'User not found'
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
