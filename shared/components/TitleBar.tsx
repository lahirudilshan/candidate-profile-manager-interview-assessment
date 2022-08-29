import { Flex, Space, Title } from '@shared/styles'
import React from 'react'

const TitleBar = ({ title, action }: TTitleBarProps) => {
    return (
        <Flex justifyContent={'space-between'} alignItems={'center'}>
            <div>
                <Title level={4} type='secondary'>{title}</Title>
                <Space bottom={2} />
            </div>
            {action && action}
        </Flex>
    )
}

// types
type TTitleBarProps = {
    title: string;
    action: React.ReactNode;
}

export default TitleBar