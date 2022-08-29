import { CSSUnits } from '@shared/styles'
import { Card } from 'antd'
import React from 'react'
import styled from 'styled-components'

const PageContent: React.FC<TPageContent> = ({ children }) => {
    return (
        <Card>
            <PageContentContainer size={1} type={'padding'}>
                {children}
            </PageContentContainer>
        </Card>
    )
}

// types
type TPageContent = {
    children: React.ReactNode;
}

const PageContentContainer = styled.div < { type?: string; size?: number; x?: number; y?: number; unit?: keyof typeof CSSUnits; }>`
    ${props => props.x && `${props.type ? props.type : 'margin'}: 0 ${props.x || 4}${props.unit || 'rem'}`};
    ${props => props.y && `${props.type ? props.type : 'margin'}: ${props.y || 4} 0 ${props.unit || 'rem'}`};
    ${props => props.size && `${props.type ? props.type : 'margin'}: ${props.size || 4}${props.unit || 'rem'}`};
`;

export default PageContent