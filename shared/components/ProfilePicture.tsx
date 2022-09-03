import { Bordered, Position } from '@shared/styles';
import { Image } from 'antd';
import React, { useState } from 'react'
import styled from 'styled-components'
import FileUploader from '@shared/components/FileUploader';

const ProfilePicture = ({ src }: TProfilePictureProps) => {
    const [profileURL, setProfileURL] = useState(src);

    const handleOnFileRemove = () => {

    }

    /**
     * handle file preview when file select
     * @param url 
     * @returns void
     */
    const handlePreviewURL = (url: string) => setProfileURL(url);

    return (
        <ProfileContainer>
            <Position type='relative'>
                <Bordered radius={'8px'}>
                    <Image src={profileURL || '/static/images/default-user.jpeg'} alt="candidate image" />
                </Bordered>
                <FileUploader onRemove={handleOnFileRemove} onPreviewURlChange={handlePreviewURL} />
            </Position>
        </ProfileContainer>
    )
}

// style
const ProfileContainer = styled.div`
    img {
        width: 254px;
        height: 254px;
        object-fit: cover;
        border-radius: 8px;
    }
`;

// types
type TProfilePictureProps = {
    src?: string;
}

export default ProfilePicture