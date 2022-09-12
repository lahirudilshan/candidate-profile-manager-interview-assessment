import React from 'react';
import { CameraOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { TAPIPromise } from '@shared/types/service';
import uploadFile from '@shared/services/files/upload'
import Upload, { RcFile, UploadFile } from 'antd/lib/upload';
import { getBase64 } from '@shared/utils';
import { message } from 'antd';

const FileUploader = ({
    icon = <CameraOutlined />,
    onPreviewURlChange,
    onRemove,
    handleProcessFinish
}: TFileUploaderProps) => {
    /**
     * upload file
     * @param { file }: TUploadFileProps
     * @return Promise<TAPIPromise<any>
     */
    const handleUploadFile = async (file: RcFile) => {
        if (!file) return { success: false, data: { message: 'Invalid file(s)' } } as TAPIPromise;

        const formData = new FormData();
        formData.append('file', file as Blob);

        return new Promise<TAPIPromise>(resolve => {
            uploadFile({
                file: formData
            })
                .then(response => {
                    if (!response.data.success) throw Error('Something went wrong!');

                    message.success('Profile picture has been uploaded!', 10)

                    resolve({
                        success: true,
                        data: response,
                    });
                })
                .catch(error => {
                    message.error('Profile picture failed to upload!', 10)

                    resolve({
                        success: false,
                        data: error,
                    });
                });
        });
    };

    /**
     * handle file upload
     * @param file: RcFile 
     * @returns Promise<boolean>
     */
    const handleChange = async (file: RcFile) => {
        try {
            const url = await getBase64(file as RcFile);

            onPreviewURlChange(url);
            await handleUploadFile(file);
        } catch (error) {
            console.log(error);
        } finally {
            handleProcessFinish();
        }

        return false;
    }

    return (
        <FileUploaderContainer>
            <Upload
                accept=".jpg, .jpeg, .png"
                action={undefined}
                beforeUpload={handleChange}
                showUploadList={false}
            >
                {icon}
            </Upload>
        </FileUploaderContainer>
    );
};

// types
type TFileUploaderProps = {
    icon?: React.ReactNode;
    onPreviewURlChange: (URL: string) => void
    onRemove: ((file: UploadFile<any>) => boolean | void | Promise<boolean | void>) | undefined
    handleProcessFinish: () => void
};

// styles
const FileUploaderContainer = styled.div`
    cursor: pointer;
    .anticon {
        font-size: 1.5rem;
        position: absolute;
        bottom: 36px;
        right: 18px;
        background-color: #c9c9c9b2;
        border-radius: 100%;
        padding: 10px;
    }
`;

export default FileUploader;
