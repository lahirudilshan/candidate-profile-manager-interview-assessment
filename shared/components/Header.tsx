import { Avatar, Layout, Menu } from 'antd';
import React from 'react'
import styled from 'styled-components';
import { PoweroffOutlined, SettingOutlined, UnlockOutlined, UsergroupAddOutlined, UserOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router';
import { signIn, signOut } from 'next-auth/react';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import { Cursor, Flex, Space } from '@shared/styles';
import WithAuth from './HOC/WithAuth';
import { TSession } from '@shared/types/component';
import { defaultUserProfile } from '@shared/utils';

const Header = ({ session }: THeaderProps) => {
    // hooks
    const { Header } = Layout;
    const router = useRouter();

    let menus: ItemType[] = [];

    if (session) {
        menus = [
            {
                key: 'candidates',
                icon: <UsergroupAddOutlined />,
                label: 'Candidates',
                onClick: () => router.push('/')
            },
            {
                key: 'settings',
                label: (
                    <Flex justifyContent={'center'} alignItems={'center'} data-cy="profile">
                        <Avatar src={session?.user?.image || defaultUserProfile} icon={<UserOutlined />} />
                        <Space left={1} />
                        {session?.user?.name}
                    </Flex>
                ),
                children: [
                    {
                        key: 'Settings',
                        label: 'Settings',
                        icon: <SettingOutlined />,
                        onClick: () => router.push('/profiles/create')
                    },
                    {
                        key: 'sign-out',
                        label: 'Sign out',
                        icon: <PoweroffOutlined />,
                        onClick: () => signOut()
                    }
                ]
            }
        ];
    } else {
        menus = [
            {
                key: 'login',
                icon: <UnlockOutlined />,
                label: 'Sign-in',
                onClick: () => signIn()
            }
        ];
    }

    return (
        <Container>
            <Header className="header" >
                <Cursor>
                    <div className="logo" onClick={() => router.push('/')}><strong>Top100</strong>&nbsp;Candidates</div>
                </Cursor>
                <Menu theme="dark" mode="horizontal" className='right-menu' items={menus} />
            </Header>
        </Container>
    )
}

// styles
const Container = styled.div`
    .logo{
        display: flex;
        align-items: center;
        align-items: center;
        float: left;
        width: 126px;
        height: 31px;
        margin: 16px 24px 16px 0;
        color: rgba(255, 255, 255, 0.584);
        font-size: 20px;
    }
    .right-menu{
        justify-content: flex-end;
    }
    .ant-avatar > img {
        border: 1px solid #4c4c4c;
        border-radius: 100%;
    }
`;

// types
type THeaderProps = TSession;

export default WithAuth(Header)