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
 */
export const saveFile = async ({ uploadPath = `/public/uploads/`, file }: TSaveFileParams) => {
    /* Create directory for uploads */
    const targetPath = path.join(process.cwd(), uploadPath);

    try {
        await fs.access(targetPath);
    } catch (e) {
        await fs.mkdir(targetPath);
    }

    /* Move uploaded files to directory */
    if (!file) throw Error('File not found');

    const tempPath = file.filepath;
    await fs.rename(tempPath, targetPath + file.originalFilename);
}