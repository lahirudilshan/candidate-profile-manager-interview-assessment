import { TWorkExperienceCreateResponse } from '@modules/profiles/types/work-experience/service';
import prisma from 'lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async (
    req: NextApiRequest,
    res: NextApiResponse<TWorkExperienceCreateResponse>
) => {
    try {
        if (req.method !== 'POST') return res.status(405).json({ success: false, message: 'Method not allowed' })

        let errors = [];

        let user = {
            name: req.body.name,
            profilePicture: '', //req.body.profilePicture,
            email: req.body.email,
            age: 0
        };

        if (!user.name) errors.push({ name: 'name is required' });
        // if (!user.profilePicture) errors.push({ name: 'profilePicture is required' });
        if (!user.email) errors.push({ name: 'email is required' });

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
