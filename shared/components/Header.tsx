import { Layout, Menu } from 'antd';
import React from 'react'
import styled from 'styled-components';
import { PoweroffOutlined, SettingOutlined, UnlockOutlined, UsergroupAddOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router';
import { signIn, signOut } from 'next-auth/react';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import { Cursor } from '@shared/styles';
import WithAuth from './HOC/WithAuth';
import { TSession } from '@shared/types/component';

const Header = ({ session }: THeaderProps) => {
    const { Header } = Layout;
    const router = useRouter();

    let menus: ItemType[] = [];

    if (session) {
        menus = [
            {
                key: 'candidates',
                icon: <UsergroupAddOutlined />,
                label: 'Candidates',
                onClick: () => router.push('/candidates')
            },
            {
                key: 'settings',
                label: session?.user?.name,
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
`;

// types
type THeaderProps = TSession;

export default WithAuth(Header)