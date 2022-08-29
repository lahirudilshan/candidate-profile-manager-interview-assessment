import React from 'react';
import Dragger from 'antd/lib/upload/Dragger';
import { CameraOutlined, CloudUploadOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { TAPIPromise } from '@shared/types/service';
import type { UploadRequestOption } from 'rc-upload/lib/interface';
import uploadFile, { TUploadFileResponse } from '@shared/services/files/upload'
import { RcFile, UploadFile } from 'antd/lib/upload';

const FileUploader = ({
    icon = <CameraOutlined />,
    onRemove,
}: TFileUploaderProps) => {
    /**
     * upload file
     * @param { file }: TUploadFileProps
     * @return Promise<TAPIPromise<any>
     */
    const handleUploadFile = async ({ file, config }: TUploadFileProps) => {
        if (!file) return { success: false, data: { message: 'Invalid file(s)' } } as TAPIPromise;

        const formData = new FormData();
        formData.append('file', file);

        return new Promise<TAPIPromise>(resolve => {
            uploadFile({
                config,
                payload: formData,
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

    return (
        <FileUploaderContainer>
            {icon}
        </FileUploaderContainer>
    );
};

// types
type TFileUploaderProps = {
    icon?: React.ReactNode;
    onRemove: ((file: UploadFile<any>) => boolean | void | Promise<boolean | void>) | undefined
};

type TUploadFileProps = {
    file: string | Blob | RcFile;
    config: any;
};

const FileUploaderContainer = styled.div`
    cursor: pointer;
    .anticon {
        font-size: 1.5rem;
        position: absolute;
        bottom: 10px;
        right: 10px;
        background-color: #c9c9c9b2;
        border-radius: 100%;
        padding: 10px;
    }
`;

export default FileUploader;
