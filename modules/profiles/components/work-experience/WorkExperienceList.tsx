import { Avatar, Button, List, Typography } from 'antd'
import React from 'react'
import VirtualList from 'rc-virtual-list';
import { DeleteOutlined, ExpandOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { TWorkExperience } from '@modules/profiles/types/work-experience/entity';
import { dateFormat } from '@shared/utils';
import { Flex, Space } from '@shared/styles';

const WorkExperienceList = ({ data, mode = 'edit', onAction }: TWorkExperienceListProps) => {
    return (
        <WorkExperienceListContainer>
            <List>
                <VirtualList
                    data={data}
                    itemHeight={47}
                    itemKey="id"
                    onScroll={() => { }}
                >
                    {(item: TWorkExperience) => (
                        <List.Item key={item.jobTitle}>
                            <List.Item.Meta
                                avatar={<Avatar src={item?.company?.logo} />}
                                title={
                                    <div><Typography.Title level={4}>{item.jobTitle}</Typography.Title></div>
                                }
                                description={
                                    <>
                                        <Typography.Title level={5} type='secondary'>{item.jobDescription}</Typography.Title>
                                        <Typography.Title level={5} type='secondary'>{item?.company?.name}</Typography.Title>
                                        <Typography.Text type='secondary'>
                                            {dateFormat(item.startDate)} - {item.endDate ? dateFormat(item.endDate) : 'Present'}
                                        </Typography.Text>
                                    </>
                                }
                            />
                            {mode === 'edit' && (
                                <Flex>
                                    <Button icon={<ExpandOutlined />} type='primary' onClick={() => onAction && onAction({ action: 'edit', data: item })} ghost>Edit</Button>
                                    <Space left={1} />
                                    <Button icon={<DeleteOutlined />} onClick={() => onAction && onAction({ action: 'delete', data: item })} danger>Delete</Button>
                                </Flex>
                            )}
                        </List.Item>
                    )}
                </VirtualList>
            </List>
        </WorkExperienceListContainer>
    )
}

// styles
const WorkExperienceListContainer = styled.div`
    h4 {
        line-height: 0.8;
    }
    h5 {
        line-height: 1.5;
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
    .ant-list-item-meta-description {
        margin-right: 20px;
    }
`;

// types
type TWorkExperienceListProps = {
    data: TWorkExperience[];
    mode?: 'view' | 'edit';
    onAction?: ({ action, data }: { action: 'edit' | 'delete', data: TWorkExperience }) => void
}

export default WorkExperienceList