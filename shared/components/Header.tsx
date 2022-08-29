import { Layout, Menu } from 'antd';
import React from 'react'
import styled from 'styled-components';
import { PoweroffOutlined, UsergroupAddOutlined } from '@ant-design/icons'

const Header = () => {
    const { Header } = Layout;

    return (
        <Container>
            <Header className="header" >
                <div className="logo">CPM</div>
                <Menu theme="dark" mode="horizontal" className='right-menu' items={[
                    {
                        key: 'candidates',
                        icon: <UsergroupAddOutlined />,
                        label: 'Candidates',
                    },
                    {
                        key: 'settings',
                        label: 'Lahiru Dilshan',
                        children: [
                            {
                                key: 'sign-out',
                                label: 'Sign out',
                                icon: <PoweroffOutlined />
                            }
                        ]
                    }
                ]} />
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

export default Header