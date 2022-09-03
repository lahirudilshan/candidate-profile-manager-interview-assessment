import { Candidate } from '@prisma/client';
import { Form, Input, Select, Switch } from 'antd'
import React, { useEffect } from 'react'

const ProfileBasicInfoForm: React.FC<TProfileBasicInfoFormProps> = ({ data }: TProfileBasicInfoFormProps) => {
    // effects
    useEffect(() => {
        form.setFieldsValue({
            fullName: data && data.name || null,
            email: data && data.email || null,
            age: data && data.age || null
        });
    }, [data])


    // hooks
    const [form] = Form.useForm();

    const handleSubmit = () => {
        console.log(form.getFieldsValue());
    }

    return (
        <Form
            form={form}
            name="basic_info"
            layout="vertical"
            onFinish={() => handleSubmit()}
            onFinishFailed={() => { }}
        >
            <Form.Item
                label="Full name"
                name="fullName"
                rules={[{ required: true, message: 'Please enter full name' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please enter email' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Age"
                name="age"
                rules={[{ required: true, message: 'Please enter age' }]}
            >
                <Select
                    showSearch
                    placeholder="Select age"
                    optionFilterProp="children"
                >
                    {Array(91).fill(1).map((el, i) => <Select.Option key={i} value={i + 10}>{i + 10}</Select.Option>)}
                </Select>
            </Form.Item>
        </Form>
    )
}

// types
type TProfileBasicInfoFormProps = {
    data: Candidate | undefined;
}

export default ProfileBasicInfoForm