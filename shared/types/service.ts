import { AxiosResponse } from 'axios';

export type TAPISignal = {
    signal: AbortSignal
}

export type TAPIPromise<T = any> = {
    success: boolean;
    data: T;
}

export type TCommonResponse<T> = {
    success: boolean,
    data: T;
    message?: string
}

export type TFetchCommonResponse<T = any> = AxiosResponse<TCommonResponse<T>>;
