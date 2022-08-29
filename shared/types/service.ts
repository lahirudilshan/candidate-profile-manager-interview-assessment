export type TAPIPromise<T = any> = {
    success: boolean;
    data: T;
}