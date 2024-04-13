import React, { useCallback, useState } from 'react';
import { Form, Input, Button, Checkbox, Card } from '@arco-design/web-react';
import { useBackendApi } from '../hooks';
import { useDispatch } from 'react-redux';
import { LoginPack } from '../types';
import { loginRequestAction } from '../action/userAction';


const Login = () => {
    const [user, setUser] = useState<LoginPack>();
    const [remember, setRemember] = useState<boolean>(false);
    const { data, loading, error, fetchData } = useBackendApi();
    const dispacth = useDispatch();

    const handleSubmit = useCallback(() => {
       return dispacth(loginRequestAction(user || {}));
    }, [user]);


    return (
        <div>
            <div className='login-container'>

                <Card style={{ width: 400, borderRadius: 8 }}>

                    {/* <h2>登录</h2> */}
                    <Form layout={'horizontal'}>
                        <Form.Item layout='vertical' style={{ display: 'flex', justifyContent: 'center' }}>
                            <h2>登录</h2>
                        </Form.Item>
                        <Form.Item label="用户名">
                            <Input
                                placeholder="请输入用户名"
                                value={user?.username}
                                onChange={e => setUser(pre => { return {...pre, username: e}})}
                            />
                        </Form.Item>
                        <Form.Item label="密码">
                            <Input.Password
                                placeholder="请输入密码"
                                value={user?.password}
                                onChange={e => setUser(pre => { return {...pre, password: e}})}
                            />
                        </Form.Item>
                        <Form.Item initialValue={remember} wrapperCol={{ offset: 5 }}>
                            <Checkbox onChange={e => setRemember(false)}>记住我</Checkbox>
                        </Form.Item>
                        <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
                            <Button type="primary" htmlType="submit" style={{ width: '100%' }} onClick={handleSubmit} >
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </div>


    );
};

export default Login;
