import { PageContent } from '@shared/components';
import { MinHeight } from '@shared/styles';
import { Col, Row } from 'antd';
import dynamic from 'next/dynamic';
import React from 'react';

const DynamicCandidate = dynamic(() => import('@modules/candidates/screen/Candidate'), {
  ssr: false,
})

const Home = () => {
  return (
    <PageContent>
      <MinHeight size={50}>
        <Row>
          <Col lg={16} offset={4}>
            <DynamicCandidate />
          </Col>
        </Row>
      </MinHeight>
    </PageContent>
  )
}

export default Home