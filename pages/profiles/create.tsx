import { CheckOutlined } from '@ant-design/icons';
import BasicInfoForm from '@modules/profiles/components/BasicInfoForm';
import WorkExperience from '@modules/profiles/components/WorkExperiance';
import { PageContent, ProfilePicture } from '@shared/components';
import TitleBar from '@shared/components/TitleBar';
import { Space, CustomDivider, Flex, Title, } from '@shared/styles';
import { Button, Col, Divider, Row, Switch, Typography } from 'antd';
import dynamic from 'next/dynamic';
import React from 'react';

const DynamicWorkExperience = dynamic(() => import('@modules/profiles/components/WorkExperiance'), {
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
            <Row gutter={[24, 24]}>
                <Col lg={6}>
                    <ProfilePicture />
                    <Space top={2} />
                    <BasicInfoForm />
                </Col>
                <Col lg={1}>
                    <Flex height='100%' justifyContent={'center'} alignItems={'center'}>
                        <CustomDivider type='vertical' />
                    </Flex>
                </Col>
                <Col lg={17}>
                    <TitleBar title="Work Experience" action={
                        <Flex>
                            <Space right={1}>
                                Available to Public
                            </Space>
                            <Switch defaultChecked onChange={() => { }} />
                        </Flex>
                    } />
                    <DynamicWorkExperience />
                </Col>
                <Col lg={24}>
                    <Flex justifyContent={'flex-end'}>
                        <Button type="primary" key="add-work-experience" icon={<CheckOutlined />} onClick={() => handleSave()}>
                            Save
                        </Button>
                    </Flex>
                </Col>
            </Row>
        </PageContent>
    )
}

export default create