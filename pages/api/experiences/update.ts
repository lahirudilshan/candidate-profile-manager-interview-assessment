import { WorkExperience } from '@prisma/client';
import { TCommonResponse } from '@shared/types/service';
import { checkAuth } from '@shared/utils/server';
import prisma from 'lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async (
    req: NextApiRequest,
    res: NextApiResponse<TCommonResponse<WorkExperience | null | Record<string, string>[]>>
) => {
    try {
        if (req.method !== 'POST') return res.status(405).json({ success: false, data: null, message: 'Method not allowed' })

        const session = await checkAuth(req);

        let workExperience: Partial<WorkExperience> = {};

        if (req.body) {
            if (req.body.candidateId) workExperience['candidateId'] = req.body.candidateId;
            if (req.body.companyId) workExperience['companyId'] = req.body.companyId;
            if (req.body.jobTitle) workExperience['jobTitle'] = req.body.jobTitle;
            if (req.body.jobDescription) workExperience['jobDescription'] = req.body.jobDescription;
            if (req.body.startDate) workExperience['startDate'] = req.body.startDate;
            if (req.body.endDate !== undefined) workExperience['endDate'] = req.body.endDate;
        }

        const updated = await prisma.workExperience.update({
            where: {
                id: req.body.id
            },
            data: workExperience
        });

        return res.status(200).json({
            success: true,
            data: updated,
            message: 'User info successfully save!'
        });
    } catch (error: any) {
        console.log(error);

        return res.status(400).json({
            success: false,
            data: error,
            message: 'something went wrong!'
        });
    }
}
