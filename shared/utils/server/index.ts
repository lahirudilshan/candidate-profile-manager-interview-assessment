import { getSession } from 'next-auth/react';
import path from "path";
import { promises as fs } from "fs";
import formidable from "formidable";
import { NextApiRequest } from "next";

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
type TSaveFileParams = {
    uploadPath?: string;
    file: File
}

/**
 * save file on server
 * @param { uploadPath: string, file: File }
 * @return boolean
 */
export const saveFile = async ({ uploadPath = `/static/images/profile-pictures/`, file }: TSaveFileParams) => {
    try {
        const targetPath = path.join(process.cwd(), '/public' + uploadPath);

        try {
            await fs.access(targetPath);
        } catch (e) {
            await fs.mkdir(targetPath);
        }

        if (!file) throw Error('File not found');

        const tempPath = file.filepath;
        const fileName = Date.now() + '_' + file.originalFilename;
        const savePath = targetPath + fileName;
        const publicPath = process.env.NEXTAUTH_URL + uploadPath + fileName;
        await fs.rename(tempPath, savePath);

        return publicPath;
    } catch (error) {
        return false;
    }
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