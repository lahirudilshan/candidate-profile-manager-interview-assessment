import React, { memo, useCallback } from 'react'
import { Breadcrumb as AntdBreadcrumb } from 'antd';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const Breadcrumb = () => {
  // hooks
  const router = useRouter();

  // variables
  let breadcrumbs: JSX.Element[] | null = null;


  /**
   * get URL parts
   * @return string[]
   */
  const getURLSegment = useCallback(() => router.pathname?.split("/").filter(segment => segment.length > 0), [router.pathname])

  /**
   * handle breadcrumb navigation
   * @param url: string
   * @return void
   */
  const handleBreadcrumbNavigation = useCallback((url: string) => {
    router.push(url);
  }, []);

  const segments = getURLSegment();

  if (segments && segments.length) {
    breadcrumbs = segments.map((segment, index) => {
      const url = "/" + segments.slice(0, index + 1).join("/");

      return <AntdBreadcrumb.Item key={url} onClick={() => handleBreadcrumbNavigation(url)}>{segment}</AntdBreadcrumb.Item>
    });
  }

  console.log('breadcrumbs render');


  return (
    <BreadcrumbContainer>
      <AntdBreadcrumb>
        <AntdBreadcrumb.Item>Home</AntdBreadcrumb.Item>
        {breadcrumbs && breadcrumbs}
      </AntdBreadcrumb>
    </BreadcrumbContainer>
  )
}

// types
type TBreadcrumbItem = {
  key: string;
  label: string;
  link: string;
}

type TBreadcrumbProps = {
  items?: TBreadcrumbItem[]
}

// styles
const BreadcrumbContainer = styled.div`
  .ant-breadcrumb-link{
    cursor: pointer;
  }
`;

export default memo(Breadcrumb)