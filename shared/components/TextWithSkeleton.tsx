import { Skeleton } from 'antd';
import React from 'react';
import styled from 'styled-components';

const TextWithSkeleton = ({
    isLoading = false,
    text = '-',
    width = '300px',
    paragraph = false,
    active = true,
}: TProps) => {
    if (isLoading) {
        return (
            <TextContainer>
                <Skeleton style={{ width }} paragraph={paragraph} active={active} />
            </TextContainer>
        );
    }

    return <TextContainer>{text}</TextContainer>;
};

// types
type TProps = {
    isLoading: boolean;
    text: string | number | JSX.Element;
    width?: string;
    paragraph?: boolean;
    active?: boolean;
};

// styles
const TextContainer = styled.div`
    .ant-skeleton-content .ant-skeleton-title {
        margin-top: 5px;
    }
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        margin-bottom: 0;
    }
`;

export default TextWithSkeleton;
