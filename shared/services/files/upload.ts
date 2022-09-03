import axios, { AxiosRequestConfig } from 'axios';

const uploadFile = async ({ file }: TUploadFile) => {
    try {
        // 👇️ const data: GetUsersResponse
        const { data, status } = await axios.post<TUploadFileResponse>(
            '/api/auth/update',
            file
        );

        console.log(status, data);

        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log('error message: ', error.message);
            return error.message;
        } else {
            console.log('unexpected error: ', error);
            return 'An unexpected error occurred';
        }
    }
}

export default uploadFile;

// types
export type TUploadFileResponse = {
    data: any;
};

export type TUploadFile = {
    file: FormData;
}
