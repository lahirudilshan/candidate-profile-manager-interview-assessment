import { Bordered, Position } from '@shared/styles';
import { Image } from 'antd';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import FileUploader from '@shared/components/FileUploader';
import { defaultUserProfile } from '@shared/utils';
import Loader from './Loader';

const ProfilePicture = ({ src }: TProfilePictureProps) => {
    // states
    const [profileURL, setProfileURL] = useState(src);
    const [isLoading, setIsLoading] = useState(false);

    // effects
    useEffect(() => {
        setProfileURL(src);
    }, [src])

    /**
     * handle file preview when file select
     * @param url 
     * @returns void
     */
    const handlePreviewURL = (url: string) => {
        setProfileURL(url);
        setIsLoading(true);
    }

    const handleProcessFinish = () => {
        setIsLoading(false);
    }

    return (
        <ProfileContainer>
            <Position type='relative'>
                <Bordered radius={'8px'} style={style.profileHeight}>
                    <Image src={profileURL || defaultUserProfile} preview={profileURL ? true : false} alt="candidate image" />
                    {isLoading && <Loader type='fit_to_content' opacity loaderColor='#fff' />}
                </Bordered>
                <FileUploader onRemove={() => { }} onPreviewURlChange={handlePreviewURL} handleProcessFinish={handleProcessFinish} />
            </Position>
        </ProfileContainer>
    )
}

// styles
const ProfileContainer = styled.div`
    img {
        width: 100%;
        object-fit: cover;
        border-radius: 8px;
    }
`;

const style = {
    profileHeight: {
        height: '280px',
        overflow: 'hidden'
    }
}

// types
type TProfilePictureProps = {
    src?: string;
}

export default ProfilePicture