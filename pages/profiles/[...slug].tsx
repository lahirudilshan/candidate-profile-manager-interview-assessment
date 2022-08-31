import WorkExperienceList from '@modules/profiles/components/work-experience/WorkExperienceList'
import { TWorkExperience } from '@modules/profiles/types/workExperience'
import { PageContent } from '@shared/components'
import { CustomDivider, Flex, Space } from '@shared/styles'
import { Col, Divider, Image, Row, Typography } from 'antd'
import dynamic from 'next/dynamic'
import React, { useState } from 'react'
import styled from 'styled-components'

// dynamic imports
const DynamicWorkExperience = dynamic(() => import('@modules/profiles/components/work-experience/WorkExperienceList'), {
  ssr: false,
})

const ProfileView = () => {
  const [workExperiences, setWorkExperiences] = useState<TWorkExperience[]>([
    {
      jobTitle: 'Senior Software Engineer',
      jobDescription: 'React, Angular, Node, Laravel experienced Engineer',
      company: 'Orel IT',
      companyLogo: '/static/images/company-logo/orel-it.jpeg',
      startDate: '2016-07-26',
      endDate: '2020-6-16'
    },
    {
      jobTitle: 'Senior Software Engineer',
      jobDescription: 'React, Angular, Node, Laravel experienced Engineer',
      company: 'Orel IT',
      companyLogo: '/static/images/company-logo/orel-it.jpeg',
      startDate: '2016-07-26',
      endDate: '2020-6-16'
    },
    {
      jobTitle: 'Senior Software Engineer',
      jobDescription: 'React, Angular, Node, Laravel experienced Engineer',
      company: 'Orel IT',
      companyLogo: '/static/images/company-logo/orel-it.jpeg',
      startDate: '2016-07-26',
      endDate: '2020-6-16'
    }
  ]);

  return (
    <ProfileViewContainer>
      <PageContent >
        <Row>
          <Col lg={24}>
            <Row gutter={[50, 50]}>
              <Col lg={10}>
                <Flex justifyContent={'center'} alignItems={'center'}>
                  <Image src='/static/images/profile-pictures/lahiru-dilshan.jpg' className='profile-picture' />
                </Flex>
              </Col>
              <Col lg={14}>
                <Typography.Title level={1}>Lahiru Dilshan</Typography.Title>
                <Typography.Title level={4} type="secondary">JavaScript Fullstack Engineer, Focused on Frontend, Skilled in React, NextJs, Angular, Node.js, and Laravel</Typography.Title>
                <Space top={3} />
                <Typography.Title level={4} type="secondary">Work Experience</Typography.Title>
                <CustomDivider margin={0} />
                <DynamicWorkExperience data={workExperiences} mode="view" />
              </Col>
            </Row>
          </Col>
        </Row>
      </PageContent>
    </ProfileViewContainer>
  )
}

// styles
const ProfileViewContainer = styled.div`
  .profile-picture {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    width: 100%;
    height: auto;
    object-position: center;
    object-fit: cover;
  }
  h4.ant-typography-secondary  {
    font-weight: 400;
  }
`;

export default ProfileView