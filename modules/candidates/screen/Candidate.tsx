import { Avatar, Image, List, Typography } from 'antd'
import React, { useState } from 'react'
import styled from 'styled-components';
import { TCandidate } from '../types/candidate';
import VirtualList from 'rc-virtual-list';
import { Cursor, Flex } from '@shared/styles';
import { useRouter } from 'next/router';

const Candidate: React.FC = () => {
    // hooks
    const router = useRouter();

    // state
    const [candidates, setCandidates] = useState<TCandidate[]>([
        {
            fullName: 'Lahiru Dilshan',
            profilePicture: '/static/images/profile-pictures/lahiru-dilshan.jpg',
            age: 27,
            jobTitle: 'Senior Software Engineer',
            jobDescription: 'React, Angular, Node, Laravel experienced Engineer',
            company: 'Orel IT',
            companyLogo: '/static/images/company-logo/orel-it.jpeg',
            startDate: '2016-07-26',
            endDate: '2020-6-16'
        },
        {
            fullName: 'Lahiru Dilshan 1',
            profilePicture: '/static/images/profile-pictures/lahiru-dilshan.jpg',
            age: 27,
            jobTitle: 'Senior Software Engineer',
            jobDescription: 'React, Angular, Node, Laravel experienced Engineer',
            company: 'Noon',
            companyLogo: '/static/images/company-logo/noon.png',
            startDate: '2016-07-26',
            endDate: '2020-6-16'
        },
        {
            fullName: 'Lahiru Dilshan 3',
            profilePicture: '/static/images/profile-pictures/lahiru-dilshan.jpg',
            age: 27,
            jobTitle: 'Senior Software Engineer',
            jobDescription: 'React, Angular, Node, Laravel experienced Engineer',
            company: 'Glints',
            companyLogo: '/static/images/company-logo/glints.png',
            startDate: '2016-07-26',
            endDate: '2020-6-16'
        },
        {
            fullName: 'Lahiru Dilshan 4',
            profilePicture: '/static/images/profile-pictures/lahiru-dilshan.jpg',
            age: 27,
            jobTitle: 'Senior Software Engineer',
            jobDescription: 'React, Angular, Node, Laravel experienced Engineer',
            company: 'Orel IT',
            companyLogo: '/static/images/company-logo/orel-it.jpeg',
            startDate: '2016-07-26',
            endDate: '2020-6-16'
        },
    ]);

    const handleProfileView = () => {
        router.push('/profiles/lahirudilshan');
    }

    return (
        <WorkExperienceListContainer>
            <List>
                <VirtualList
                    data={candidates}
                    itemHeight={47}
                    itemKey="candidates"
                    onScroll={() => { }}
                >
                    {(candidate: TCandidate) => (
                        <Cursor>
                            <List.Item key={candidate.fullName} onClick={handleProfileView}>
                                <List.Item.Meta
                                    avatar={<Avatar src={candidate.profilePicture} />}
                                    title={
                                        <Typography.Title level={4}>{candidate.jobTitle}</Typography.Title>
                                    }
                                    description={
                                        <>
                                            <Typography.Title level={5} type='secondary'>{candidate.jobDescription}</Typography.Title>
                                            <Typography.Title level={5} type='secondary'>
                                                <Image src={candidate.companyLogo} className="company-logo" />
                                                {candidate.company}
                                            </Typography.Title>
                                            <Typography.Text type='secondary'>{candidate.startDate} - {candidate.startDate ? candidate.startDate : 'Present'}</Typography.Text>
                                        </>
                                    }
                                />
                                <Flex justifyContent={'flex-start'}>{candidate.age} Years old</Flex>
                            </List.Item>
                        </Cursor>
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
        width: 150px;
        height: 150px;
        line-height: 150px;
        border-radius: 8px;
    }
    .ant-list-item {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        padding: 22px 0;
    }
    .company-logo {
        width: 30px;
        height: 30px;
        border-radius: 8px;
        margin-right: 10px;
    }
`;

export default Candidate