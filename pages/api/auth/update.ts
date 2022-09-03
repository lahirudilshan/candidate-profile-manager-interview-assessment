import { TCommonResponse } from '@modules/profiles/types/work-experience/service';
import { getFileFromRequest } from '@shared/utils/server/index';
import type { NextApiRequest, NextApiResponse } from 'next';
import { saveFile } from '@shared/utils/server';

export const config = {
    api: {
        bodyParser: false,
    }
};

export default async (req: NextApiRequest, res: NextApiResponse<TCommonResponse<any>>) => {
    try {
        const file = await getFileFromRequest({ req });

        if (!file) throw Error('Something went wrong!');

        saveFile({ file });

        return res.status(200).json({
            success: true,
            data: [],
            message: 'File has been uploaded!'
        });
    } catch (error) {
        return res.status(500).json({
            success: true,
            data: [],
            message: 'Something went wrong!'
        });
    }
}