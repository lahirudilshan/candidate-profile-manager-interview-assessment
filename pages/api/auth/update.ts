import { TCandidate } from '@modules/profiles/types/entity';
import { Candidate } from '@prisma/client';
import { TCommonResponse } from '@shared/types/service';
import { checkAuth } from '@shared/utils/server';
import prisma from 'lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async (
    req: NextApiRequest,
    res: NextApiResponse<TCommonResponse<Candidate | null | Record<string, string>[]>>
) => {
    try {
        if (req.method !== 'POST') return res.status(405).json({ success: false, data: null, message: 'Method not allowed' })

        const session = await checkAuth(req);

        let user: Partial<TCandidate> = {};

        if (req.body) {
            if (req.body.name) user['name'] = req.body.name;
            if (req.body.age) user['age'] = req.body.age;
            if (req.body.isPublic !== undefined) user['isPublic'] = req.body.isPublic;
            if (req.body.profileURL !== undefined) user['profileURL'] = req.body.profileURL;
        }

        const save = await prisma.candidate.update({
            where: {
                email: session!.user!.email as string
            },
            data: user
        });

        return res.status(200).json({
            success: true,
            data: save,
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
