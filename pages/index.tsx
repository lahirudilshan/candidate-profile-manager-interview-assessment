import { TCandidate } from '@modules/profiles/types/entity';
import { PageContent } from '@shared/components';
import { MinHeight } from '@shared/styles';
import { TCommonResponse } from '@shared/types/service';
import { Col, Row } from 'antd';
import axios from 'axios';
import { GetServerSidePropsContext } from 'next';
import dynamic from 'next/dynamic';
import React from 'react';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  let candidates = null;

  try {
    const response = await axios.post<TCommonResponse<TCandidate[]>>(`${process.env.NEXT_PUBLIC_URL}/api/candidates/fetch`);

    candidates = response.data.data;
  } catch (error) { }

  return { props: { candidates } }
}


const DynamicCandidates = dynamic(() => import('@modules/candidates/screen/Candidate'), {
  ssr: false,
})

const Home = ({ candidates }: THomeProps) => {
  return (
    <PageContent>
      <MinHeight size={50}>
        <Row>
          <Col lg={16} offset={4}>
            <DynamicCandidates data={candidates} />
          </Col>
        </Row>
      </MinHeight>
    </PageContent>
  )
}

type THomeProps = {
  candidates: TCandidate[];
}

export default Home