import styled from 'styled-components';
import { Col, Divider, Row, Typography } from 'antd';
import { Property } from 'csstype'

export enum CSSUnits { 'px', 'vh', 'rem', 'cm', 'mm', 'in', 'pt', 'pc' };

// flex utils
const Flex = styled.div<{
    justifyContent?: Property.JustifyContent;
    alignItems?: Property.AlignItems;
    direction?: Property.FlexDirection;
    width?: string;
    height?: string;
    minHeight?: string;
    margin?: string;
    gap?: string
}>`
    display: flex;
    ${props => props.direction && `flex-direction: ${props.direction};`}
    ${props => props.justifyContent && `justify-content: ${props.justifyContent};`}
    ${props => props.alignItems && `align-items: ${props.alignItems};`}
    ${props => props.minHeight && `min-height: ${props.minHeight};`}
    ${props => props.height && `height: ${props.height};`}
    ${props => props.width && `width: ${props.width};`}
    ${props => props.margin && `margin: ${props.margin};`}
    ${props => props.gap && `gap: ${props.gap};`}
`;

const FlexRow = styled(Row)`
    display: flex;
`;

const SameHeightCol = styled(Col)`
    display: flex; 
    flex-direction: column; 
`;

// spaces utils
const Space = styled.div<{
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
    x?: number;
    y?: number;
    size?: number;
    unit?: keyof typeof CSSUnits;
}>`
    ${props => props.top && `margin-top: ${props.top || 0.5}${(props.unit && props.unit) || 'rem'}`};
    ${props => props.bottom && `margin-bottom: ${props.bottom || 0.5}${(props.unit && props.unit) || 'rem'}`};
    ${props => props.left && `margin-left: ${props.left || 0.5}${(props.unit && props.unit) || 'rem'}`};
    ${props => props.right && `margin-right: ${props.right || 0.5}${(props.unit && props.unit) || 'rem'}`};
    ${props => props.x && `margin: 0 ${props.x}${(props.unit && props.unit) || 'rem'}`};
    ${props => props.y && `margin: ${props.y}${(props.unit && props.unit) || 'rem'} 0`};
    ${props => props.size && `margin: ${props.size}${(props.unit && props.unit) || 'rem'}`};
`;

// text utils
const TextBold = styled.div<{ weight?: Property.FontWeight | number }>`
    ${props => `font-weight: ${props.weight || 400}`};
`;

const TextTruncate = styled.div<{ size: number }>`
    ${props => `width: ${props.size || 250}rem`};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

// others
const MinHeight = styled.div<{ size?: number; unit?: keyof typeof CSSUnits }>`
    ${props => `min-height: ${props.size || 20}${props.unit || 'rem'}`};
`;

const Position = styled.div<{ type?: Property.Position }>`
 position: ${(props) => `${props.type || 'relative'}`};
`;

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #f2f2f2;
    box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%);
    width: 100%;
    margin: 0 auto;
    padding: 2rem;
    overflow-y: auto;
`;

const CustomDivider = styled(Divider) <{ margin?: number; }>`
    ${props => props.type === 'vertical' && `height: 100%;`}
    ${props => props.type === 'horizontal' && `
        .ant-divider-horizontal {
            ${props.margin && `margin: ${props.margin}rem 0 !important;`};
        }`
    }
`;

const Title = styled(Typography.Title)`
    font-weight: 300 !important;
`;

const Bordered = styled.div<{ padding?: string; }>`
    ${props => props.padding && `padding: ${props.padding};`}
    border: 1px solid #eee;
`;

const Cursor = styled.div<{ type?: string }>`
    cursor: ${props => props.type || 'pointer'};
    .ant-list-item {
        padding: 20px !important;
        margin: 10px 0;
    }
    .ant-list-item:hover {
        border-radius: 8px;
        background-color: #ecf0f1;
    }
`;

export {
    Flex,
    Space,
    TextTruncate,
    TextBold,
    MinHeight,
    Position,
    PageContainer,
    FlexRow,
    SameHeightCol,
    CustomDivider,
    Title,
    Bordered,
    Cursor
};