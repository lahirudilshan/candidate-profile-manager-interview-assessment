import { Company } from '@prisma/client';
import { TCommonResponse } from '@shared/types/service';
import { checkAuth } from '@shared/utils/server';
import prisma from 'lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async (
    req: NextApiRequest,
    res: NextApiResponse<TCommonResponse<Company[] | null | Record<string, string>[]>>
) => {
    try {
        if (req.method !== 'GET') return res.status(405).json({ success: false, data: null, message: 'Method not allowed' });

        const session = await checkAuth(req);

        const companies = await prisma.company.findMany();

        if (companies) {
            return res.status(200).json({
                success: true,
                data: companies,
                message: 'Company fetched successfully!'
            });
        } else {
            return res.status(500).json({
                success: false,
                data: [],
                message: 'Company not found'
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
