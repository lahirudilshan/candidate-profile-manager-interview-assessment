import { LoadingOutlined } from '@ant-design/icons';
import React from 'react';
import styled from 'styled-components';
import { Flex } from '@shared/styles';

const Loader = ({
    width = '100%',
    height = '100%',
    minHeight = '200px',
    loaderSize = '50px',
    type = 'content',
    bgColor = undefined,
    opacity = false,
}: TLoaderParams) => {
    return (
        <LoaderContainer
            width={width}
            height={height}
            minHeight={minHeight}
            loaderSize={loaderSize}
            type={type}
            bgColor={bgColor}
            opacity={opacity ? true : false}
            className="loader">
            <Flex justifyContent={'center'} alignItems={'center'} className="loading-container">
                <LoadingOutlined />
            </Flex>
        </LoaderContainer>
    );
};

// types
type TLoaderParams = {
    width?: string;
    height?: string;
    minHeight?: string;
    loaderSize?: string;
    bgColor?: string;
    opacity?: boolean;
    type?: 'content' | 'fullscreen' | 'fit_to_content';
};

// styles
const LoaderContainer = styled.div<{
    width?: string;
    height?: string;
    minHeight?: string;
    loaderSize?: string;
    bgColor?: string;
    opacity?: boolean;
    type?: 'content' | 'fullscreen' | 'fit_to_content';
}>`
    width: ${(props) => props.width || '100%'};
    .loading-container,
    &.ant-modal-content {
        z-index: 1001 !important;
        width: ${(props) => props.width || '100%'};
        height: ${(props) => props.height};
        min-height: ${(props) => props.minHeight};
        background-color: ${(props) => (props.bgColor !== undefined ? props.bgColor : 'unset')};
        font-size: ${(props) => props.loaderSize};

        ${(props) =>
        props.type === 'fullscreen' &&
        `
                width: 100vw;
                height: 100vh;
                min-height: 585px;
                background-color: #f6f3f36b;
                font-size: 50px;
                position: fixed;
                z-index: 4;
                top: 0;
                left: 0;
            `}

        ${(props) =>
        props.type === 'fit_to_content' &&
        `
                width: 100%;
                height: 100%;
                background-color: ${props.opacity !== undefined && props.opacity === true ? '#f6f3f36b' : '#fff'};
                font-size: 50px;
                position: absolute;
                z-index: 4;
                top: 0;
                left: 0;
            `}
    }
`;

export default Loader;
