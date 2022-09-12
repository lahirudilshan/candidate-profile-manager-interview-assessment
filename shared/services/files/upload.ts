import axios from 'axios';

/**
 * file upload
 * @param { file }: TUploadFile 
 * @returns Promise<string | TUploadFileResponse>
 */
const uploadFile = async ({ file }: TUploadFile) => {
    return await axios.post<TUploadFileResponse>(
        '/api/auth/upload',
        file
    );
}

// types
export type TUploadFileResponse = {
    data: any;
    success: boolean;
};

export type TUploadFile = {
    file: FormData;
}

export default uploadFile;

