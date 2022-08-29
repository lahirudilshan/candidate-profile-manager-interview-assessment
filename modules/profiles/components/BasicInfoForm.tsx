import { Form, Input, Switch } from 'antd'
import React from 'react'

const ProfileBasicInfoForm: React.FC = () => {
    return (
        <Form
            name="basic_info"
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={() => { }}
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
                label="Age"
                name="age"
                rules={[{ required: true, message: 'Please enter age' }]}
            >
                <Input type={'number'} />
            </Form.Item>
        </Form>
    )
}

export default ProfileBasicInfoForm