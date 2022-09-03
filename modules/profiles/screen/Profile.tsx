import { CheckOutlined, PlusOutlined } from '@ant-design/icons';
import TitleBar from '@shared/components/TitleBar';
import { Bordered, Flex, Space } from '@shared/styles';
import { Avatar, Button, Col, DatePicker, Form, Input, Modal, Result, Row, Select } from 'antd'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components';
import WorkExperienceList from '@modules/profiles/components/work-experience/WorkExperienceList';
import { TWorkExperience } from '@modules/profiles/types/work-experience/entity';

const Profile: React.FC<TProfileProps> = ({ data }) => {
    // variables 
    const companies = [
        {
            name: 'Orel IT',
            logo: '/static/images/company-logo/orel-it.jpeg'
        },
        {
            name: 'Noon',
            logo: '/static/images/company-logo/noon.png'
        },
        {
            name: 'Glints',
            logo: '/static/images/company-logo/glints.png'
        }
    ];

    // state
    const [modal, setModal] = useState({
        status: false,
        data: null
    });

    const handleModal = useCallback(({ status, data }: TModalParams) => {
        setModal({
            status,
            data
        })
    }, []);

    const handleAddWorkExperience = () => {

    }

    return (
        <ProfileContainer>
            <TitleBar title="Work Experiences" action={
                <Button icon={<PlusOutlined />} onClick={() => handleModal({ status: true })} />
            } />

            {data && data.length > 0 ? (
                <WorkExperienceList data={data} />
            ) : (<Bordered>
                <Result
                    title="Work Experience not found!"
                    extra={
                        <Button type="primary" key="add-work-experience" icon={<PlusOutlined />} onClick={() => handleModal({ status: true })}>
                            Add Work Experience
                        </Button>
                    }
                />
            </Bordered >)}

            <Modal
                title="Add Work Experience"
                centered
                visible={modal.status}
                onCancel={() => handleModal({ status: false, data: null })}
                footer={
                    <>
                        <Button onClick={() => handleModal({ status: false, data: null })}>Cancel</Button>
                        <Button type='primary' icon={<CheckOutlined />} onClick={handleAddWorkExperience}>Add</Button>
                    </>
                }
                width={800}
            >
                <Form
                    name="basic_info"
                    layout="vertical"
                    initialValues={{ remember: true }}
                    onFinish={() => { }}
                    onFinishFailed={() => { }}
                >
                    <Row gutter={[24, 0]}>
                        <Col lg={24}>
                            <Form.Item
                                label="Job Title"
                                name="jobTitle"
                                rules={[{ required: true, message: 'Please enter job title' }]}
                            >
                                <Input placeholder='e.g: Senior Software Engineer' />
                            </Form.Item>
                        </Col>
                        <Col lg={24}>
                            <Form.Item
                                label="Job Description"
                                name="jobDescription"
                                rules={[{ required: true, message: 'Please job description' }]}
                            >
                                <Input.TextArea rows={4} placeholder='e.g: React Frontend Engineer with 6+ years of experience in industry' />
                            </Form.Item>
                        </Col>
                        <Col lg={8}>
                            <Form.Item name="company" label="Company">
                                <Select showSearch>
                                    {companies.length > 0 && companies.map((company) => <Select.Option key={company.name}>
                                        <Flex alignItems={'center'}>
                                            <Avatar
                                                src={company.logo}
                                                size='small'
                                            />
                                            <Space left={1}>{company.name}</Space>
                                        </Flex>
                                    </Select.Option>)}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col lg={8}>
                            <Form.Item name="date-picker" label="Start Date">
                                <DatePicker style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                        <Col lg={8}>
                            <Form.Item name="end-picker" label="End Date">
                                <DatePicker style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </ProfileContainer>
    )
}

const ProfileContainer = styled.div`
    .ant-select, .ant-picker {
        width: 100% !important;
    }
`;

// types
type TModalParams = {
    status: boolean;
    data?: any;
}

type TProfileProps = {
    data: TWorkExperience[] | undefined
}

export default Profile