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
      candidateId: req.body.candidateId,
      jobTitle: req.body.jobTitle,
      jobDescription: req.body.jobDescription,
      companyId: req.body.companyId,
      startDate: req.body.startDate,
      endDate: req.body.endDate || null,
    };

    if (!data.jobTitle) errors.push({ jobTitle: 'jobTitle is required' });
    if (!data.jobDescription) errors.push({ name: 'jobDescription is required' });
    if (!data.companyId) errors.push({ name: 'company is required' });
    if (!data.startDate) errors.push({ startDate: 'startDate is required' });

    if (errors.length > 0) return res.status(400).json({ success: false, message: 'Missing required fields', data: errors })

    const saveWorkExperience = await prisma.workExperience.create({ data });

    return res.status(200).json({
      success: true,
      data: saveWorkExperience,
      message: 'Work experience successfully added'
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      success: false,
      data: null,
      message: 'something went wrong!'
    });
  }
}
