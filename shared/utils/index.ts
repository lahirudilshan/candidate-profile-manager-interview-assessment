import { RcFile } from "antd/lib/upload";

/**
 * get file as based64 string
 * @param file 
 * @returns Promise<string>
 */
export const getBase64 = (file: RcFile): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });
}