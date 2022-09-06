import { Avatar, Image, List, Result, Typography } from 'antd'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components';
import { TFetchCandidateParams, TFetchCandidatesResponse } from '@modules/candidates/types/candidate';
import VirtualList from 'rc-virtual-list';
import { Cursor, Flex, Space } from '@shared/styles';
import { useRouter } from 'next/router';
import { TLoader } from '@shared/types/component';
import axios from 'axios';
import { TCandidate } from '@modules/profiles/types/entity';
import { dateFormat, getLatestExperience, removeSpaces } from '@shared/utils';
import SearchInput from '@shared/components/SearchInput';
import Loader from '@shared/components/Loader';

const Candidate: React.FC = () => {
    // hooks
    const router = useRouter();

    // state
    const [candidates, setCandidates] = useState<TCandidate[]>();
    const [isLoading, setIsLoading] = useState<TLoader>({
        fullScreen: true,
    });

    // refs
    const searchRef = useRef<string | null>(null);
    const searchDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // effects
    useEffect(() => {
        fetchCandidates();
    }, []);

    /**
    * search candidate profiles
    * @param event: ChangeEvent
    * @return void
    */
    const onSearchCandidate = (q: string) => {
        setIsLoading({
            ...isLoading,
            fullScreen: true
        });

        searchRef.current = q;

        searchDebounceRef.current && clearTimeout(searchDebounceRef.current);
        searchDebounceRef.current = setTimeout(() => {
            fetchCandidates({ q: removeSpaces((searchRef.current as string)) || null });
        }, 500);
    }

    /**
     * handle fetch candidates
     * @param q: string | null
     * @return void
     */
    const fetchCandidates = useCallback(({ q = null }: TFetchCandidateParams = {}) => {
        axios.post('/api/candidates/fetch', {
            q
        })
            .then((response: TFetchCandidatesResponse) => {
                if (response.data.data) setCandidates(response.data.data);
            })
            .catch((error) => {
                console.log('error', error)
            })
            .finally(() => {
                setIsLoading({
                    ...isLoading,
                    fullScreen: false
                })
            });
    }, [isLoading])

    /**
     * navigation to profile details view
     * @return void
     */
    const handleProfileView = useCallback((candidate: TCandidate) => {
        router.push(`/profiles/${candidate.profileURL}`);
    }, []);

    return (
        <WorkExperienceListContainer>
            <Space size={1}>
                <SearchInput onChange={onSearchCandidate} size="large" width='100%' placeholder='Search people or job title' />
            </Space>
            <Space top={2} />
            {isLoading.fullScreen ?
                <Loader type='content' />
                :
                candidates && candidates.length > 0 ?
                    <List>
                        <VirtualList
                            key={'list'}
                            data={candidates}
                            itemHeight={47}
                            itemKey="candidates"
                            onScroll={() => { }}
                        >
                            {(candidate: TCandidate) => (
                                <Cursor>
                                    <List.Item key={candidate.name} onClick={() => handleProfileView(candidate)}>
                                        <List.Item.Meta
                                            avatar={<Avatar src={candidate.profilePicture || '/static/images/default-user.jpeg'} />}
                                            title={
                                                <div><Typography.Title level={4}>{candidate.name}</Typography.Title></div>
                                            }
                                            description={
                                                <>
                                                    <Typography.Title level={5} type='secondary'>
                                                        {getLatestExperience(candidate)?.jobTitle || 'Unknown Job Title'}
                                                    </Typography.Title>
                                                    {candidate.workExperiences.length > 0 &&
                                                        <>
                                                            <Typography.Title level={5} type='secondary'>
                                                                <Image src={getLatestExperience(candidate)?.company?.logo} className="company-logo" />
                                                                {getLatestExperience(candidate)?.company.name}
                                                            </Typography.Title>
                                                            <Typography.Text type='secondary'>
                                                                {dateFormat(getLatestExperience(candidate)?.startDate)} - {dateFormat(getLatestExperience(candidate)?.endDate || undefined) || 'Present'}
                                                            </Typography.Text>
                                                        </>
                                                    }
                                                </>
                                            }
                                        />
                                        <Flex justifyContent={'flex-start'}>{candidate.age} Years old</Flex>
                                    </List.Item>
                                </Cursor>
                            )}
                        </VirtualList>
                    </List>
                    : (
                        <Result
                            title="Candidates not founds"
                        />
                    )}
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