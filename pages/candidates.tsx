import Candidate from '@modules/candidates/screen/Candidate'
import { PageContent } from '@shared/components'
import TitleBar from '@shared/components/TitleBar'
import { Col, Row } from 'antd'
import dynamic from 'next/dynamic'
import React from 'react'

const DynamicCandidate = dynamic(() => import('@modules/candidates/screen/Candidate'), {
    ssr: false,
})

const candidates = () => {
    return (
        <PageContent >
            <Row>
                <Col lg={16} offset={4}>
                    <TitleBar title='Awesome Candidates' />
                    <DynamicCandidate />
                </Col>
            </Row>
        </PageContent>
    )
}

export default candidates