import { checkAuth, getFileFromRequest } from '@shared/utils/server/index';
import type { NextApiRequest, NextApiResponse } from 'next';
import { saveFile } from '@shared/utils/server';
import prisma from 'lib/prisma'
import { TCommonResponse } from '@shared/types/service';

export const config = {
    api: {
        bodyParser: false,
    }
};

export default async (req: NextApiRequest, res: NextApiResponse<TCommonResponse<any>>) => {
    try {
        const session = await checkAuth(req);

        const file = await getFileFromRequest({ req });
        if (!file) throw Error('Something went wrong!');

        const path = await saveFile(file);
        if (!path.data) throw Error("Image couldn't upload");

        const save = await prisma.candidate.update({
            where: {
                email: session!.user!.email as string
            },
            data: {
                profilePicture: path.data.webContentLink
            }
        });

        return res.status(200).json({
            success: true,
            data: {
                isFileSave: path.data,
                isDBUpdate: JSON.stringify(save)
            },
            message: 'File has been uploaded!'
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            data: [],
            message: error as string || 'Something went wrong!'
        });
    }
}