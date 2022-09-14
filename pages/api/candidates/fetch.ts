import { Candidate } from '@prisma/client';
import { TCommonResponse } from '@shared/types/service';
import prisma from 'lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async (
    req: NextApiRequest,
    res: NextApiResponse<TCommonResponse<Candidate[] | null | Record<string, string>[]>>
) => {
    try {
        let whereFilters: any = {
            isPublic: true
        }

        if (req.method !== 'POST') return res.status(405).json({ success: false, data: null, message: 'Method not allowed' });

        const searchTerm = req.body.q;

        if (searchTerm !== null) {
            whereFilters = {
                ...whereFilters,
                name: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            }
        }

        const candidates = await prisma.candidate.findMany({
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
            where: whereFilters
        });

        if (candidates) {
            return res.status(200).json({
                success: true,
                data: candidates,
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