import { Avatar, Button, List, Typography } from 'antd'
import React from 'react'
import VirtualList from 'rc-virtual-list';
import { TWorkExperience } from '../../types/workExperience';
import { ExpandOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const WorkExperienceList = ({ data, mode = 'edit' }: TWorkExperienceListProps) => {
    return (
        <WorkExperienceListContainer>
            <List>
                <VirtualList
                    data={data}
                    itemHeight={47}
                    itemKey="experiences"
                    onScroll={() => { }}
                >
                    {(item: TWorkExperience) => (
                        <List.Item key={item.jobTitle}>
                            <List.Item.Meta
                                avatar={<Avatar src={item.companyLogo} />}
                                title={
                                    <Typography.Title level={4}>{item.jobTitle}</Typography.Title>
                                }
                                description={
                                    <>
                                        <Typography.Title level={5} type='secondary'>{item.jobDescription}</Typography.Title>
                                        <Typography.Title level={5} type='secondary'>{item.company}</Typography.Title>
                                        <Typography.Text type='secondary'>{item.startDate} - {item.startDate ? item.startDate : 'Present'}</Typography.Text>
                                    </>
                                }
                            />
                            {mode === 'edit' && <Button icon={<ExpandOutlined />}>Edit</Button>}
                        </List.Item>
                    )}
                </VirtualList>
            </List>
        </WorkExperienceListContainer>
    )
}

// styles
const WorkExperienceListContainer = styled.div`
    h4, h5 {
        line-height: 0.8;
    }
    h5 {
        margin-top: 0.8em;
        font-weight: 500;
    }
    .ant-avatar {
        width: 40px;
        height: 40px;
        line-height: 39px;
        border-radius: 8px; 
    }
`;

// types
type TWorkExperienceListProps = {
    data: TWorkExperience[];
    mode?: 'view' | 'edit';
}

export default WorkExperienceList