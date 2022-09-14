import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { removeSpaces } from '@shared/utils';

const SearchInput = ({ defaultValue = '', width = '260px', size = "middle", placeholder = 'Search...', onChange }: TSearchInputProps) => {
    return (
        <SearchContainer>
            <Input
                defaultValue={defaultValue}
                placeholder={placeholder}
                prefix={<SearchOutlined />}
                style={{ width: width }}
                allowClear={true}
                size={size}
                data-cy="search"
                onChange={(event) => onChange(removeSpaces(event.target.value))}
            />
        </SearchContainer>
    );
};

// types
type TSearchInputProps = {
    defaultValue?: string;
    placeholder?: string;
    width?: string;
    size?: "small" | "middle" | "large"
    onChange: (q: string) => void;
};

// styles
const SearchContainer = styled.div`
    .ant-input-affix-wrapper {
        width: 250px;
        border-radius: 0px;
    }
    .ant-input-prefix {
        color: #b0babf;
        padding-right: 10px;
    }
`;

export default SearchInput;
