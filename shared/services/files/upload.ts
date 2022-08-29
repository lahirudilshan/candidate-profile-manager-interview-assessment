import axios, { AxiosRequestConfig } from 'axios';
import { defaultAPIHeader } from '@shared/services';

const uploadFile = async ({ config = defaultAPIHeader, payload }: TUploadFile) => {
    try {
        // 👇️ const data: GetUsersResponse
        const { data, status } = await axios.post<TUploadFileResponse>(
            'https://reqres.in/api/users',
            payload,
            config
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
    config: AxiosRequestConfig;
    payload: any
}
