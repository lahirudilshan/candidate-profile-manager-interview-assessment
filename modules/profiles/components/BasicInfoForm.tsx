import { Candidate } from '@prisma/client';
import { Form, FormInstance, Input, Select, Typography } from 'antd'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { CheckOutlined, CloseOutlined, LoadingOutlined } from '@ant-design/icons';
import axios from 'axios';
import { TFetchCommonResponse } from '@shared/types/service';
import { TLoader } from '@shared/types/component';
import { stringToSlug } from '@shared/utils';
import { TCandidate } from '@modules/profiles/types/entity';
import { useAPIAbort } from '@shared/hooks';

const ProfileBasicInfoForm: React.FC<TProfileBasicInfoFormProps> = ({ form, data, updateData, disableSubmitButton }: TProfileBasicInfoFormProps) => {
    // hooks
    const signal = useAPIAbort();

    // state
    const [profileURL, setProfileURL] = useState<string | undefined>(undefined);
    const [validURL, setValidURL] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<TLoader>({
        content: false,
        fullScreen: false
    });

    // refs
    const searchRef = useRef<string | null>(null);
    const searchDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // effects
    useEffect(() => {
        data && setProfileURL(data.profileURL);

        form.setFieldsValue({
            name: data && data.name || undefined,
            email: data && data.email || undefined,
            age: data && data.age || undefined,
            profileURL: data && data.profileURL || undefined
        });
    }, [data]);

    useEffect(() => {
        form.setFieldValue('profileURL', profileURL || undefined);

        if (data && profileURL && validURL) {
            updateData && updateData({
                ...data,
                profileURL
            });
        }
    }, [profileURL])


    /**
     * check profile url availability
     * @param event: ChangeEvent
     * @return void
     */
    const checkProfileURLAvailability = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsLoading({
            ...isLoading,
            content: true
        });

        searchRef.current = event.target.value;

        searchDebounceRef.current && clearTimeout(searchDebounceRef.current);

        const slugURL = stringToSlug(event.target.value);
        setProfileURL(slugURL);

        searchDebounceRef.current = setTimeout(() => {
            slugURL && checkURLAvailability(slugURL);
        }, 500);
    }

    /**
     * handle fetch companies
     * @param requestedURL: string
     * @return void
     */
    const checkURLAvailability = useCallback((requestedURL: string) => {
        axios.post('/api/auth/check-public-url', {
            profileURL: requestedURL
        }, { signal })
            .then((response: TFetchCommonResponse<boolean>) => {
                setValidURL(response.data.data ? true : false);
                disableSubmitButton(response.data.data ? false : true);
            })
            .catch((error) => {
                setValidURL(false)
            })
            .finally(() => {
                setIsLoading({
                    ...isLoading,
                    content: false
                })
            });
    }, []);

    return (
        <>
            <Form.Item
                label="Full name"
                name="name"
                rules={[{ required: true, message: 'Please enter full name' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please enter email' }]}
            >
                <Input disabled />
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
            <Form.Item
                label="username"
                name="profileURL"
                rules={[{ required: true, message: 'Please enter username' }]}
                extra={
                    <>
                        top100.com/<strong>{profileURL}</strong>{' '}{isLoading.content ?
                            <LoadingOutlined />
                            :
                            validURL ?
                                <Typography.Text type='success'><CheckOutlined /></Typography.Text>
                                :
                                <Typography.Text type='danger'><CloseOutlined /></Typography.Text>
                        }
                    </>
                }>
                <Input onChange={checkProfileURLAvailability} autoComplete="off" />
            </Form.Item>

        </>
    )
}

// types
type TProfileBasicInfoFormProps = {
    data: TCandidate | undefined;
    updateData: React.Dispatch<React.SetStateAction<TCandidate | undefined>>;
    form: FormInstance<Partial<Candidate>>;
    disableSubmitButton: (status: boolean) => void
}

export default ProfileBasicInfoForm