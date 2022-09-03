import { TProfileCreateResponse } from '@modules/profiles/types/service';
import prisma from 'lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async (
  req: NextApiRequest,
  res: NextApiResponse<TProfileCreateResponse>
) => {
  try {
    if (req.method !== 'POST') return res.status(405).json({ success: false, message: 'Method not allowed' })

    let errors = [];

    let data = {
      name: req.body.name,
      age: req.body.age,
      email: req.body.email,
      isPublic: req.body.isPublic || false,
      profilePicture: req.body.profilePicture,
    };

    if (!data.name) errors.push({ name: 'name is required' });
    if (!data.age) errors.push({ name: 'age is required' });
    if (!data.profilePicture) errors.push({ profilePicture: 'profilePicture must be selected' });

    if (errors.length > 0) return res.status(400).json({ success: false, message: 'Missing required fields', data: errors })

    const saveProfile = await prisma.candidate.create({ data });

    return res.status(200).json({
      success: true,
      data: saveProfile,
      message: 'Profile created successfully'
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      data: null,
      message: 'something went wrong!'
    });
  }
}
