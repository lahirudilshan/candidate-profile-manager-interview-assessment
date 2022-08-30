import { CheckOutlined } from '@ant-design/icons';
import BasicInfoForm from '@modules/profiles/components/BasicInfoForm';
import { PageContent, ProfilePicture } from '@shared/components';
import TitleBar from '@shared/components/TitleBar';
import { Space, CustomDivider, Flex, } from '@shared/styles';
import { Button, Col, Row, Switch } from 'antd';
import dynamic from 'next/dynamic';
import React from 'react';

const DynamicWorkExperience = dynamic(() => import('@modules/profiles/components/WorkExperience'), {
    ssr: false,
})

const create = () => {
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
                <Col lg={6}>
                    <ProfilePicture />
                    <Space top={2} />
                    <BasicInfoForm />
                </Col>
                <Col lg={2}>
                    <Flex height='100%' justifyContent={'center'} alignItems={'center'}>
                        <CustomDivider type='vertical' />
                    </Flex>
                </Col>
                <Col lg={16}>
                    <DynamicWorkExperience />
                </Col>
                <Col lg={24}>
                    <Flex justifyContent={'flex-end'}>
                        <Button type="primary" key="add-work-experience" icon={<CheckOutlined />} onClick={() => handleSave()}>
                            Save changes
                        </Button>
                    </Flex>
                </Col>
            </Row>
        </PageContent>
    )
}

export default create