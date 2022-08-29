import { CameraOutlined } from '@ant-design/icons';
import { Position } from '@shared/styles';
import { Image } from 'antd';
import React from 'react'
import styled from 'styled-components'
import FileUploader from '@shared/components/FileUploader';

const ProfilePicture = () => {
    const handleOnFileRemove = () => {

    }

    return (
        <ProfileContainer>
            <Position type='relative'>
                <Image src={'/static/images/default-user.jpeg'} alt="candidate image" />
                <FileUploader onRemove={handleOnFileRemove} />
            </Position>
        </ProfileContainer>
    )
}

// style
const ProfileContainer = styled.div`
    width: 100%;
    img {
        width: 100%;
        border-radius: 8px;
    }
`;

export default ProfilePicture