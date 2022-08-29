import { Header, Breadcrumb } from '@shared/components';
import { Layout } from 'antd';
import React from 'react';
import styled from 'styled-components';

const { Content } = Layout;

const PageLayout: React.FC<TProps> = ({ children }: TProps) => {

  return (
    <Container>
      <Layout>
        <Header />
        <Layout>
          <Layout className='main-layout'>
            <Breadcrumb />
            <Content className="content">
              {children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </Container>
  );
}

// types
type TProps = {
  children: JSX.Element | JSX.Element[];
}

// styles
const Container = styled.div`
  .side-bar .context {
    background: #fff;
  }
  .context{
    padding: 24px;
    margin: 0px;
  }
  .main-layout {
    padding: 0px 24px 24px;
    min-height: 100vh;
  }
  .ant-breadcrumb{
    margin: 16px 0px;
  }
`;

export default PageLayout