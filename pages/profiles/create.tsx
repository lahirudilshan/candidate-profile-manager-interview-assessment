import { CheckOutlined } from '@ant-design/icons';
import BasicInfoForm from '@modules/profiles/components/BasicInfoForm';
import { TCandidate } from '@modules/profiles/types/entity';
import { TFetchProfileResponse } from '@modules/profiles/types/work-experience/service';
import { Candidate } from '@prisma/client';
import { PageContent, ProfilePicture } from '@shared/components';
import WithAuth from '@shared/components/HOC/WithAuth';
import TitleBar from '@shared/components/TitleBar';
import { Space, CustomDivider, Flex, } from '@shared/styles';
import { TSession } from '@shared/types/component';
import { Button, Col, Row, Switch } from 'antd';
import axios from 'axios';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';

const DynamicWorkExperience = dynamic(() => import('@modules/profiles/screen/Profile'), {
    ssr: false,
})

const create = ({ session }: TCreateProps) => {
    // hooks

    // status
    const [user, setUser] = useState<TCandidate | undefined>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // effects
    useEffect(() => {
        handleFetchUserDetails();

        return () => { }
    }, []);

    /**
     * handle fetch user details
     * @return void
     */
    const handleFetchUserDetails = async () => {
        setIsLoading(true);

        axios.post('/api/auth/fetch', {
            email: session.user?.email
        })
            .then((response: TFetchProfileResponse) => setUser(response.data.data))
            .catch((error) => console.log('error', error))
            .finally(() => setIsLoading(false));

    }


    const handleFileUploadSuccess = () => {

    }

    const handleFileRemove = () => {

    }

    const handleSave = () => {

    }

    return (
        <PageContent >
            <Row>
                <Col lg={24}>
                    <TitleBar title="Manage Profile" bottom={2} action={
                        <Flex>
                            <Space right={1}>
                                Available to Public
                            </Space>
                            <Switch defaultChecked onChange={() => { }} />
                        </Flex>
                    } />
                </Col>
                <Col lg={4}>
                    <ProfilePicture src={user?.profilePicture} />
                    <Space top={2} />
                    <BasicInfoForm data={user} />
                    <Flex justifyContent={'flex-end'}>
                        <Button type="primary" key="add-work-experience" icon={<CheckOutlined />} onClick={() => handleSave()} block>
                            Save changes
                        </Button>
                    </Flex>
                </Col>
                <Col lg={2}>
                    <Flex height='100%' justifyContent={'center'} alignItems={'center'}>
                        <CustomDivider type='vertical' />
                    </Flex>
                </Col>
                <Col lg={18}>
                    <DynamicWorkExperience data={user?.workExperiences} />
                </Col>
            </Row>
        </PageContent>
    )
}

// types
type TCreateProps = TSession;

export default WithAuth(create)