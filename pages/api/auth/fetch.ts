import { TWorkExperienceCreateResponse } from '@modules/profiles/types/work-experience/service';
import prisma from 'lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async (
    req: NextApiRequest,
    res: NextApiResponse<TWorkExperienceCreateResponse>
) => {
    try {
        if (req.method !== 'POST') return res.status(405).json({ success: false, message: 'Method not allowed' });
        if (req.body && !req.body.email) return res.status(400).json({ success: false, message: 'email param is required' })

        const save = await prisma.candidate.findFirst({
            where: {
                email: req.body.email
            },
            include: {
                workExperiences: true
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


    } catch (error) {
        return res.status(400).json({
            success: false,
            data: JSON.stringify(error),
            message: 'something went wrong!'
        });
    }
}
