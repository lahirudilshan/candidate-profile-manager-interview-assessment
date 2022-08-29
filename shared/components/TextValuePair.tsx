import { Typography } from 'antd';
import React from 'react';
import TextWithSkeleton from '@shared/components/TextWithSkeleton';
import styled from 'styled-components';
import { Space } from '@shared/styles';

const TextValuePair = ({ text, value, isLoading = false, required = false, gap = 0 }: TProps) => {
    return (
        <TextContainer>
            <Typography.Text>
                {text}
                {required ? <span className="required">*</span> : ''}
            </Typography.Text>
            <Space top={gap} unit="px" />
            <Typography.Text type="secondary">
                <TextWithSkeleton active={!isLoading && !value ? false : true} isLoading={isLoading} text={value} />
            </Typography.Text>
        </TextContainer>
    );
};

const TextContainer = styled.span`
    .required {
        color: red;
    }
`;

// type
type TProps = {
    text: string | JSX.Element;
    value: string | number | JSX.Element;
    isLoading?: boolean;
    required?: boolean;
    gap?: number;
};

export default TextValuePair;
