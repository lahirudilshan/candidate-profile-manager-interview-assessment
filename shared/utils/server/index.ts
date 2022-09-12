import { getSession } from 'next-auth/react';
import fs from "fs";
import formidable, { File } from "formidable";
import { NextApiRequest } from "next";
import { getDriverService } from '@pages/api/auth/google-auth';

/***************************
 * get file from request
 ***************************/

type TGetFileFromRequestParams = {
    req: NextApiRequest
}

/**
 * get file from request
 * @param { req }: TGetFileFromRequestParams 
 * @returns 
 */
export const getFileFromRequest = async ({ req }: TGetFileFromRequestParams) => {
    return await new Promise<File | undefined>((resolve, reject) => {
        const form = new formidable.IncomingForm();
        let requestFile: File;

        form.on('file', function (field, file) {
            requestFile = file;
        })
        form.on('end', () => resolve(requestFile));
        form.on('error', err => reject(err));
        form.parse(req, () => { });
    });
}



/***************************
 * File save functions
 ***************************/
/**
 * save file on server
 * @param { uploadPath: string, file: File }
 * @return boolean
 */
export const saveFile = async (file: File) => {
    const fileMetadata = {
        name: file.newFilename,
        parents: ["1LLiSeSmrxplVHYMJ6M243OTVElIAsZZ6"], // parents: mean upload folder ID of google drive
    };

    const service = getDriverService();

    // create file on drive
    const createResponse = await service.files.create({
        requestBody: fileMetadata,
        media: {
            mimeType: file.mimetype as string,
            body: fs.createReadStream(file.filepath),
        },
        fields: "id",
    });

    if (createResponse.data.id) {
        // make permission for file view
        await service.permissions.create({
            fileId: createResponse.data.id,
            requestBody: {
                role: 'reader',
                type: 'anyone'
            }
        });

        // get file viewable urls
        return await service.files.get({
            fileId: createResponse.data.id,
            fields: "webViewLink, webContentLink",
        });
    }

    throw Error(`something went wrong!, file couldn't upload`);
}

/**
 * check user authenticated or not
 * @param req: NextApiRequest 
 * @returns session: Session | null
 */
export const checkAuth = async (req: NextApiRequest) => {
    const session = await getSession({ req });

    if (!session) throw Error('user must be login in');

    return session;
}