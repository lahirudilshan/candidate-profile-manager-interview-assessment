import { TCandidate } from '@modules/profiles/types/entity';
import { PageContent } from '@shared/components';
import { CustomDivider, Flex, Space } from '@shared/styles';
import { Button, Col, Image, Result, Row, Typography } from 'antd';
import axios from 'axios';
import dynamic from 'next/dynamic';
import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router'
import { TCommonResponse } from '@shared/types/service';
import { defaultUserProfile, getLatestExperience, getTotalYearsOfExperienceWithText } from '@shared/utils';

export async function getServerSideProps(context: any) {
  let candidate = null;

  try {
    const response = await axios.post<TCommonResponse<TCandidate>>(`${process.env.NEXT_PUBLIC_URL}/api/candidates/detail`, {
      profileURL: context.params.slug[0]
    });

    candidate = response.data.data;
  } catch (error) { }

  return { props: { candidate } }
}

const DynamicWorkExperienceList = dynamic(() => import('@modules/profiles/components/work-experience/WorkExperienceList'), {
  ssr: false,
});

const ProfileView = ({ candidate }: TProfileViewProps) => {
  // hooks
  const router = useRouter();

  /**
     * get years of experience
     * @param candidate: TCandidate
     * @return void
     */
  const yearsOfExperience = useCallback((candidate: TCandidate) => {
    return getTotalYearsOfExperienceWithText({
      startDate: candidate.workExperiences[0].startDate,
      endDate: getLatestExperience(candidate)?.endDate
    });
  }, []);

  return (
    <ProfileViewContainer>
      {
        candidate ?
          <PageContent >
            <Row>
              <Col lg={24}>
                <Row gutter={[50, 50]}>
                  <Col lg={10}>
                    <Flex justifyContent={'center'} alignItems={'center'}>
                      <Image src={candidate.profilePicture || defaultUserProfile} className='profile-picture' />
                    </Flex>
                  </Col>
                  <Col lg={14}>
                    <Typography.Title level={1} data-cy="candidate-name">{candidate.name}</Typography.Title>
                    <Typography.Title level={4} type="secondary"> {getLatestExperience(candidate)?.jobTitle || 'Unknown Job Title'}</Typography.Title>
                    <Space top={3} />
                    {candidate && candidate.workExperiences && candidate.workExperiences.length > 0 && (
                      <>
                        <Typography.Title level={4} type="secondary">
                          <Flex justifyContent={'space-between'} alignItems={'center'}>
                            <div>Work Experience</div>
                            <div>
                              {yearsOfExperience(candidate)}
                            </div>
                          </Flex>
                        </Typography.Title>
                        <CustomDivider margin={0} />
                        <DynamicWorkExperienceList data={candidate.workExperiences} mode="view" />
                      </>
                    )}
                  </Col>
                </Row>

              </Col>
            </Row>
          </PageContent>
          :
          (
            <>
              <Space top={8} />
              <Flex justifyContent={'center'} alignItems={'center'}>
                <Result
                  status="warning"
                  title="Profile Not Found"
                  subTitle="This Profile not found or not available for public"
                  extra={
                    <Button type="primary" key="home" onClick={() => router.push('/')}>
                      Go Home
                    </Button>
                  }
                />
              </Flex>
            </>
          )
      }
    </ProfileViewContainer >
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

// types
type TProfileViewProps = {
  candidate: TCandidate;
}

export default ProfileView