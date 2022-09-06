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

        let errors: Record<string, string>[] = [];

        if (!req.body.profileURL) errors.push({ profileURL: 'profileURL is required' });

        if (errors.length > 0) return res.status(400).json({ success: false, message: 'Missing required fields', data: errors })

        const candidate = await prisma.candidate.findFirst({
            include: {
                workExperiences: {
                    include: {
                        company: true
                    },
                    orderBy: {
                        startDate: 'asc'
                    },
                },
            },
            orderBy: {
                createdAt: 'desc'
            },
            where: {
                isPublic: true,
                profileURL: req.body.profileURL
            }
        });

        if (candidate) {
            return res.status(200).json({
                success: true,
                data: candidate,
                message: 'Candidate fetched successfully!'
            });
        } else {
            return res.status(500).json({
                success: false,
                data: [],
                message: 'Candidate not found'
            });
        }
    } catch (error: any) {
        console.log(error);

        return res.status(400).json({
            success: false,
            data: error,
            message: 'something went wrong!'
        });
    }
}
