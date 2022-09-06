import { CheckOutlined, PlusOutlined } from '@ant-design/icons';
import TitleBar from '@shared/components/TitleBar';
import { Bordered, Flex, Space } from '@shared/styles';
import { Avatar, Button, Col, DatePicker, Form, Input, message, Modal, Result, Row, Select } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components';
import WorkExperienceList from '@modules/profiles/components/work-experience/WorkExperienceList';
import { TWorkExperience } from '@modules/profiles/types/work-experience/entity';
import { disableFutureDate, isFormValid } from '@shared/utils';
import { TLoader, TModalState } from '@shared/types/component';
import axios from 'axios';
import { TCandidate } from '@modules/profiles/types/entity';
import { TCompanyResponse } from '@shared/types/company/service';
import { TCompany } from '@shared/types/company/entity';
import Loader from '@shared/components/Loader';
import moment from 'moment';
import { WorkExperience } from '@prisma/client';
import { TFetchProfileResponse } from '@modules/profiles/types/service';

const WorkExperience: React.FC<TWorkExperienceProps> = ({ data, user }) => {
    // hooks
    const [form] = Form.useForm();

    // state
    const [companies, setCompanies] = useState<TCompany[]>();
    const [experiences, setExperiences] = useState<TWorkExperience[]>([]);

    const [modal, setModal] = useState<TModalState>({
        status: false,
        mode: 'create',
        data: null
    });

    const [isLoading, setIsLoading] = useState<TLoader>({
        fullScreen: false,
        content: false
    });

    // effects
    useEffect(() => {
        setExperiences(data ? data : []);
    }, [data])


    /**
     * handle fetch companies
     * @return void
     */
    const fetchCompany = useCallback(() => {
        axios.get('/api/companies')
            .then((response: TCompanyResponse) => {
                if (response.data.data) setCompanies(response.data.data);
            })
            .catch((error) => {
                message.error(`Something went wrong!, companies couldn't fetched!`, 6);;
            })
            .finally(() => {
                setIsLoading({
                    ...isLoading,
                    content: false
                })
            });
    }, []);

    /**
     * handle fetch user details
     * @return void
     */
    const fetchExperience = async () => {
        setIsLoading({
            ...isLoading,
            fullScreen: true
        });

        axios.post('/api/auth/fetch', {
            email: user?.email
        })
            .then((response: TFetchProfileResponse) => {
                if (response.data.data && response.data.data.workExperiences) {
                    setExperiences(response.data.data.workExperiences);
                }
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

    }

    /**
     * handle modal actions
     * @params { status, data }: TModalParams
     * @return void
     */
    const handleModal = useCallback(({ status, data, mode }: TModalParams) => {
        if (status) fetchCompany();

        form.resetFields();

        setModal({
            status,
            data,
            mode
        });
    }, []);

    /**
     * handle experience create modal
     * @returns 
     */
    const handleSubmit = async () => {
        try {
            if (!user) throw Error('Auth user not found');

            const isValid = await isFormValid(form);

            if (!isValid) return;

            setIsLoading({
                ...isLoading,
                fullScreen: true
            });

            const data = await form.getFieldsValue();
            const action = modal.mode === 'edit' ? 'update' : 'create';

            let payload: Partial<WorkExperience> = {
                candidateId: user.id,
                companyId: data.company,
                jobTitle: data.jobTitle,
                jobDescription: data.jobDescription,
                startDate: data.startDate,
                endDate: data.endDate
            }

            if (modal.mode === 'edit' && modal.data.id) payload.id = modal.data.id;

            axios.post(`/api/experiences/${action}`, payload)
                .then(() => {
                    handleModal({
                        ...modal,
                        status: false,
                        data: null,
                    });

                    fetchExperience();

                    message.success('work experience has been added!', 6);;
                })
                .catch((error) => {
                    message.error(`Something went wrong!, work experience couldn't added!`, 6);;
                })
                .finally(() => {
                    setIsLoading({
                        ...isLoading,
                        fullScreen: false
                    })
                });
        } catch (error) {
            message.error(error as string || 'Something went wrong!', 6);;
        }
    }

    /**
     * delete work experience
     * @param id
     * @return void
     */
    const handleExperienceDelete = async (id: number) => {
        try {
            if (!id) throw Error('id need to pass for deleting experience');

            setIsLoading({
                ...isLoading,
                fullScreen: true
            });

            axios.post('/api/experiences/delete', {
                id
            })
                .then(() => {
                    handleModal({
                        status: false,
                        data: null,
                        mode: 'create'
                    });

                    fetchExperience();

                    message.success('work experience has been deleted!', 6);;
                })
                .catch((error) => {
                    message.error(`Something went wrong!, work experience couldn't deleted!`, 6);;
                })
                .finally(() => {
                    setIsLoading({
                        ...isLoading,
                        fullScreen: false
                    })
                });
        } catch (error) {
            message.error(error as string || 'Something went wrong!', 6);;
        }
    }

    /**
     * handle experience edit
     * @param data: TWorkExperience
     * @return void 
     */
    const handleExperienceEdit = (data: TWorkExperience) => {
        handleModal({
            status: true,
            data,
            mode: 'edit'
        });

        form.setFieldsValue({
            jobTitle: data.jobTitle,
            jobDescription: data.jobDescription,
            company: data.companyId,
            startDate: moment(data.startDate),
            endDate: data.endDate && moment(data.endDate) || null,
        });
    }

    /**
     * handle list action
     * @param { action, data }: TListAction 
     * @return void
     */
    const handleAction = ({ action, data }: TListAction) => {
        if (action === 'delete') handleExperienceDelete(data.id);
        if (action === 'edit') handleExperienceEdit(data);
    }

    return (
        <WorkExperienceContainer>
            <TitleBar title="Work Experiences" action={
                experiences && experiences.length > 0 && <Button icon={<PlusOutlined />} onClick={() => handleModal({ status: true, mode: 'create' })} />
            } />

            {experiences && experiences.length > 0 ? (
                <WorkExperienceList data={experiences} onAction={handleAction} />
            ) : (<Bordered>
                <Result
                    title="Work Experience not found!"
                    extra={
                        <Button type="primary" key="add-work-experience" icon={<PlusOutlined />} onClick={() => handleModal({ status: true, mode: 'create' })}>
                            Add Work Experience
                        </Button>
                    }
                />
            </Bordered >)}

            {isLoading.fullScreen && <Loader type='fullscreen' opacity={true} />}

            <Modal
                title={`${modal.mode === 'edit' ? 'Update' : 'Add'} Work Experience`}
                centered
                visible={modal.status}
                onCancel={() => handleModal({ status: false, data: null, mode: 'create' })}
                footer={
                    <>
                        <Button onClick={() => handleModal({ status: false, data: null, mode: 'create' })}>Cancel</Button>
                        <Button type='primary'
                            icon={<CheckOutlined />}
                            htmlType="submit"
                            onClick={handleSubmit}
                            disabled={isLoading.content}
                            loading={isLoading.content}
                        >{modal.mode === 'edit' ? 'Update' : 'Add'}</Button>
                    </>
                }
                width={800}
            >
                <Form
                    form={form}
                    name="basic_info"
                    layout="vertical"
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
                            <Form.Item
                                name="company"
                                label="Company"
                                rules={[{ required: true, message: 'Please select company' }]}
                            >
                                <Select showSearch>
                                    {companies && companies.length > 0 && companies.map((company) => <Select.Option key={company.name} value={company.id}>
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
                            <Form.Item
                                name="startDate"
                                label="Start Date"
                                rules={[{ required: true, message: 'Please select start date' }]}>
                                <DatePicker style={{ width: '100%' }} disabledDate={(current) => disableFutureDate(current)} />
                            </Form.Item>
                        </Col>
                        <Col lg={8}>
                            <Form.Item name="endDate" label="End Date">
                                <DatePicker style={{ width: '100%' }} disabledDate={(current) => disableFutureDate(current)} />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </WorkExperienceContainer>
    )
}

// styles
const WorkExperienceContainer = styled.div`
    .ant-select, .ant-picker {
        width: 100% !important;
    }
`;

// types
type TModalParams = {
    status: boolean;
    data?: any;
    mode: 'edit' | 'create'
}

type TWorkExperienceProps = {
    data: TWorkExperience[] | undefined;
    user: TCandidate | undefined;
}

type TListAction = {
    action: 'edit' | 'delete',
    data: TWorkExperience
}

export default WorkExperience