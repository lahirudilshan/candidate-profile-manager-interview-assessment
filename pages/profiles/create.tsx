import { CheckOutlined, EyeOutlined } from '@ant-design/icons';
import BasicInfoForm from '@modules/profiles/components/BasicInfoForm';
import { TCandidate } from '@modules/profiles/types/entity';
import { TFetchProfileResponse } from '@modules/profiles/types/service';
import { Candidate } from '@prisma/client';
import { PageContent, ProfilePicture } from '@shared/components';
import WithAuth from '@shared/components/HOC/WithAuth';
import Loader from '@shared/components/Loader';
import TitleBar from '@shared/components/TitleBar';
import { useAPIAbort } from '@shared/hooks';
import { Space, CustomDivider, Flex, } from '@shared/styles';
import { TLoader, TSession } from '@shared/types/component';
import { Button, Col, Form, message, Row, Switch } from 'antd';
import axios from 'axios';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';

const DynamicWorkExperience = dynamic(() => import('@modules/profiles/screen/WorkExperience'), {
    ssr: false,
});

const create = ({ session }: TCreateProps) => {
    // hooks
    const [form] = Form.useForm();
    const router = useRouter();
    const signal = useAPIAbort();

    // status
    const [user, setUser] = useState<TCandidate | undefined>();
    const [disableSubmitButton, setDisableSubmitButton] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<TLoader>({
        fullScreen: false,
        content: false
    });

    // effects
    useEffect(() => {
        session && handleFetchUserDetails();
    }, []);

    /**
     * handle fetch user details
     * @return void
     */
    const handleFetchUserDetails = useCallback(async () => {
        setIsLoading({
            ...isLoading,
            fullScreen: true
        });

        axios.post('/api/auth/fetch', {
            email: session.user?.email
        }, { signal })
            .then((response: TFetchProfileResponse) => {
                setUser(response.data.data)
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

    }, [isLoading, signal]);

    /**
     * handle basic info save 
     * @param data Partial<Candidate>
     * @return void
     */
    const handleSubmit = useCallback((data: Partial<Candidate>) => {
        setIsLoading({
            ...isLoading,
            fullScreen: true
        });

        axios.post('/api/auth/update', {
            name: data.name,
            age: data.age,
            profileURL: form.getFieldValue('profileURL')
        }, { signal })
            .then(() => {
                message.success('Profile has been updated!', 6);
            })
            .catch((error) => {
                message.error(`Something went wrong, Profile couldn't updated`, 6);
            })
            .finally(() => {
                setIsLoading({
                    ...isLoading,
                    fullScreen: false
                });
            });
    }, [isLoading, signal]);

    /**
     * handle profile privacy
     * @param value: boolean
     * @return void
     */
    const handleAccountPrivacy = useCallback((value: boolean) => {
        setIsLoading({
            ...isLoading,
            fullScreen: true
        });

        axios.post('/api/auth/update', {
            isPublic: value,
        }, { signal })
            .then(() => {
                message.success(`Profile has been changed to ${value ? 'public' : 'private'}`, 6);
            })
            .catch((error) => {
                message.error(`Something went wrong, Profile couldn't updated`, 6);
            })
            .finally(() => {
                setIsLoading({
                    ...isLoading,
                    fullScreen: false
                });
            });

    }, [isLoading, signal]);

    return (
        <PageContent >
            {isLoading.fullScreen && <Loader type='fullscreen' opacity={true} />}
            <Row>
                <Col lg={24}>
                    <TitleBar title="Manage Profile" bottom={2} action={
                        <Flex alignItems={'center'}>
                            <Flex alignItems={'center'}>
                                <Space right={1}>
                                    Available to Public
                                </Space>
                                {user !== undefined && <Switch defaultChecked={user?.isPublic} onChange={handleAccountPrivacy} />}
                            </Flex>
                            <Space right={2} />
                            {user?.profileURL && <Button type='primary' icon={<EyeOutlined />} onClick={() => router.push(`/profiles/${user?.profileURL}`)}>View as guest</Button>}
                        </Flex>
                    } />
                </Col>
                <Col lg={4}>
                    <ProfilePicture src={user?.profilePicture} />
                    <Space top={2} />
                    <Form
                        form={form}
                        name="basic_info"
                        layout="vertical"
                        onFinish={handleSubmit}
                    >
                        <BasicInfoForm form={form} data={user} updateData={setUser} disableSubmitButton={setDisableSubmitButton} />
                        <Flex justifyContent={'flex-end'}>
                            <Button type="primary" htmlType='submit' disabled={disableSubmitButton || isLoading.content} loading={isLoading.content} key="add-work-experience" icon={<CheckOutlined />} block>
                                Save changes
                            </Button>
                        </Flex>
                    </Form>
                </Col>
                <Col lg={2}>
                    <Flex height='100%' justifyContent={'center'} alignItems={'center'}>
                        <CustomDivider type='vertical' />
                    </Flex>
                </Col>
                <Col lg={18}>
                    {user?.workExperiences && <DynamicWorkExperience user={user} data={user?.workExperiences} />}
                </Col>
            </Row>
        </PageContent>
    )
}

// types
type TCreateProps = TSession;

export default WithAuth(create)