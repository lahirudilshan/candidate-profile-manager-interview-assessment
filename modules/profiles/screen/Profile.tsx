import { CheckOutlined, PlusOutlined } from '@ant-design/icons';
import TitleBar from '@shared/components/TitleBar';
import { Bordered } from '@shared/styles';
import { Avatar, Button, Col, DatePicker, Form, Input, Modal, Result, Row, Select } from 'antd'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components';
import { TWorkExperience } from '../types/workExperience';
import WorkExperienceList from '../components/work-experience/WorkExperienceList';

const Profile: React.FC = () => {
    // state
    const [modal, setModal] = useState({
        status: false,
        data: null
    });
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
        }, {
            jobTitle: 'Senior Software Engineer',
            jobDescription: 'React, Angular, Node, Laravel experienced Engineer',
            company: 'Orel IT',
            companyLogo: '/static/images/company-logo/orel-it.jpeg',
            startDate: '2016-07-26',
            endDate: '2020-6-16'
        }
    ]);

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
            {/* <Bordered>
                <Result
                    title="Work Experience not found!"
                    extra={
                        <Button type="primary" key="add-work-experience" icon={<PlusOutlined />} onClick={() => handleModal({ status: true })}>
                            Add Work Experience
                        </Button>
                    }
                />
            </Bordered> */}

            <TitleBar title="Work Experiences" action={
                <Button icon={<PlusOutlined />} onClick={() => handleModal({ status: true })} />
            } />

            <WorkExperienceList data={workExperiences} />

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
                                    <Select.Option key={'test'}>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}>
                                            <Avatar
                                                src={'/static/images/company-logo/orel-it.jpeg'}
                                                style={{
                                                    color: '#999',
                                                    backgroundColor: '#fff'
                                                }}
                                                icon='shop'
                                                size='small'
                                            />
                                            <span style={{ marginLeft: 8 }}>Orel IT</span>
                                        </div>
                                    </Select.Option>
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

export default Profile