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

    let errors = [];

    let data = {
      id: req.body.id
    };

    if (!data.id) errors.push({ jobTitle: 'Id is required' });

    if (errors.length > 0) return res.status(400).json({ success: false, message: 'Missing required fields', data: errors })

    const deleteWorkExperience = await prisma.workExperience.delete({
      where: {
        id: req.body.id
      }
    });

    return res.status(200).json({
      success: true,
      data: deleteWorkExperience,
      message: 'Work experience successfully added'
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      data: null,
      message: 'something went wrong!'
    });
  }
}
