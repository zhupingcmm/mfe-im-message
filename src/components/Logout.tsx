import React from 'react';
import { Button, Space, Popover, Badge, Typography } from '@arco-design/web-react';
import { SendMessage, ReadyState } from 'react-use-websocket';
import {
    IconMore,
} from '@arco-design/web-react/icon';
import { getConnenctionStatus, logout } from '../utils';

const ButtonGroup = Button.Group;

interface LogoutProps {
    sendMessage: SendMessage;
    readyState: ReadyState;
}

export const Logout = (props: LogoutProps) => {
    const { sendMessage, readyState } = props;
    return (
        <div className='logout'>
            <Space >
                <ButtonGroup>

                    <Button type='secondary'>
                        <Space>
                            <Typography.Text>123</Typography.Text>
                            <Badge status={getConnenctionStatus(readyState)} />
                        </Space>

                    </Button>

                    <Popover content={
                        <Space direction='vertical'>
                            <Button type='text' onClick={() => logout(sendMessage)}> 登出</Button>
                            <Button type='text'> 切换用户</Button>
                        </Space>
                    }>
                        <Button type='secondary' icon={<IconMore />} />
                    </Popover>
                </ButtonGroup>
            </Space>
        </div>

    )
}