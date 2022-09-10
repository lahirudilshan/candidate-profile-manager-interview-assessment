import { Header, Breadcrumb } from '@shared/components';
import { Space } from '@shared/styles';
import { Layout } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

const { Content } = Layout;

const PageLayout: React.FC<TProps> = ({ children }: TProps) => {
  // hooks
  const router = useRouter();
  const breadcrumbShouldNotInclude = ['/'];

  return (
    <Container>
      <Layout>
        <div className='header-placeholder'>
          <Header />
        </div>
        <Layout>
          <Layout className='main-layout'>
            {!breadcrumbShouldNotInclude.includes(router.asPath) ? <Breadcrumb /> : (<Space top={1.5} />)}
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
  .header-placeholder {
    height: 64px;
    background-color: #001529;
  }
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