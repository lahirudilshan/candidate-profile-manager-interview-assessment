import React, { useState } from 'react';
import Dragger from 'antd/lib/upload/Dragger';
import { CameraOutlined, CloudUploadOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { TAPIPromise } from '@shared/types/service';
import type { UploadRequestOption } from 'rc-upload/lib/interface';
import uploadFile, { TUploadFileResponse } from '@shared/services/files/upload'
import Upload, { RcFile, UploadChangeParam, UploadFile } from 'antd/lib/upload';
import { getBase64 } from '@shared/utils';

const FileUploader = ({
    icon = <CameraOutlined />,
    onPreviewURlChange,
    onRemove,
    api = '/api/auth/update'
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
                    resolve({
                        success: true,
                        data: response,
                    });
                })
                .catch(error => {
                    resolve({
                        success: false,
                        data: error,
                    });
                });
        });
    };

    const handleChange = async (file: RcFile) => {
        console.log(file);
        try {
            const url = await getBase64(file as RcFile);

            onPreviewURlChange(url);
            handleUploadFile(file);
        } catch (error) {
            console.log(error);
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
    api?: string;
    onPreviewURlChange: (URL: string) => void
    onRemove: ((file: UploadFile<any>) => boolean | void | Promise<boolean | void>) | undefined
};

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
