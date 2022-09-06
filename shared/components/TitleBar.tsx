import { Flex, Space, Title } from '@shared/styles'
import React from 'react'

const TitleBar = ({ title, bottom = 1, action = null }: TTitleBarProps) => {
    return (
        <>
            <Flex justifyContent={'space-between'} alignItems={'center'}>
                <Flex justifyContent={'space-between'} alignItems={'center'}>
                    <Title level={4} type='secondary'>{title}</Title>
                    <Space bottom={2} />
                </Flex>
                {action && action}
            </Flex>
            <Space bottom={bottom} />
        </>
    )
}

// types
type TTitleBarProps = {
    title: string | React.ReactNode;
    bottom?: number;
    action?: React.ReactNode;
}

export default TitleBar