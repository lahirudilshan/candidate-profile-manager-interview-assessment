import { Candidate } from '@prisma/client';
import { TCommonResponse } from '@shared/types/service';
import prisma from 'lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async (
    req: NextApiRequest,
    res: NextApiResponse<TCommonResponse<Candidate | null | Record<string, string>[]>>
) => {
    try {
        if (req.method !== 'POST') return res.status(405).json({ success: false, data: null, message: 'Method not allowed' });
        if (req.body && !req.body.email) return res.status(400).json({ success: false, data: null, message: 'email param is required' });

        const save = await prisma.candidate.findFirst({
            where: {
                email: req.body.email
            },
            include: {
                workExperiences: {
                    include: {
                        company: true
                    },
                    orderBy: {
                        startDate: 'asc'
                    }
                }
            }
        });

        if (save) {
            return res.status(200).json({
                success: true,
                data: save,
                message: 'User info successfully fetched!'
            });
        } else {
            return res.status(200).json({
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
