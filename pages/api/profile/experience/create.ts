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

    let data = {
      candidateId: req.body.candidateId,
      jobTitle: req.body.jobTitle,
      jobDescription: req.body.jobDescription,
      companyId: req.body.company,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
    };

    if (!data.jobTitle) errors.push({ jobTitle: 'jobTitle is required' });
    if (!data.jobDescription) errors.push({ name: 'jobDescription is required' });
    if (!data.companyId) errors.push({ name: 'company is required' });
    if (!data.startDate) errors.push({ startDate: 'startDate is required' });
    if (!data.endDate) errors.push({ endDate: 'endDate is required' });

    if (errors.length > 0) return res.status(400).json({ success: false, message: 'Missing required fields', data: errors })

    const saveWorkExperience = await prisma.workExperience.create({ data });

    return res.status(200).json({
      success: true,
      data: saveWorkExperience,
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
