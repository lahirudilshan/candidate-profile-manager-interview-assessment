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

        let user = {
            name: req.body.name,
            profilePicture: '',
            email: req.body.email,
            profileURL: req.body.profileURL,
            age: 0
        };

        if (!user.name) errors.push({ name: 'name is required' });
        if (!user.email) errors.push({ name: 'email is required' });
        if (!user.profileURL) errors.push({ name: 'profileURL is required' });

        if (errors.length > 0) return res.status(400).json({ success: false, message: 'Missing required fields', data: errors })

        const save = await prisma.candidate.create({ data: user });

        return res.status(200).json({
            success: true,
            data: save,
            message: 'User info successfully save!'
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            data: null,
            message: 'something went wrong!'
        });
    }
}
