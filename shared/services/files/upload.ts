import axios from 'axios';

/**
 * file upload
 * @param { file }: TUploadFile 
 * @returns Promise<string | TUploadFileResponse>
 */
const uploadFile = async ({ file }: TUploadFile) => {
    try {
        const { data, status } = await axios.post<TUploadFileResponse>(
            '/api/auth/upload',
            file
        );

        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.message;
        } else {
            return 'An unexpected error occurred';
        }
    }
}

// types
export type TUploadFileResponse = {
    data: any;
};

export type TUploadFile = {
    file: FormData;
}

export default uploadFile;

