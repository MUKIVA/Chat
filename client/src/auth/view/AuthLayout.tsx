import React, { useState } from 'react'
import { useAction, useAtom } from '@reatom/react'
import { Redirect } from 'react-router-dom'
import { Button, Form, Input } from 'antd'
import styles from "./Auth.module.css"
import { isAuthAtom, login } from '../model/auth'
import { users } from '../../main/model/MockMessages'

const buttonStyle: React.CSSProperties = {
    backgroundColor: '#2b2b2b',
    borderColor: '#2b2b2b',
    margin: 5,
}

const inputStyle: React.CSSProperties = {
    width: 300,
}

export function AuthLayout() {   
    const isAuth = useAtom(isAuthAtom)
    const handleLogin = useAction(login)

    const [userName, setUserName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<number>(0);

    const onLogIn = () => {
        setError((users.includes({name: userName, password: password})) ? 0 : 1)
        if ((error !== 1) && userName && password) {
            handleLogin({
                name: userName,
                password: password,
            })
            console.log('Log!', userName, password, error);
        }
        else console.log('Log?', userName, password, error);
    };
    
    const onRegister = () => {
        setError(((users.filter((user) => user.name === userName)).length !== 0) ? 2 : 0)
        if ((error !== 2) && userName && password) {
            handleLogin({
                name: userName,
                password: password,
            })
            console.log('Reg!', userName, password, error);
        }
        else console.log('Reg?', userName, password, error);
    };

    if (isAuth) {
        return <Redirect to={'/main'} />
    }

    return (
        <div className={styles.content}>
            <Form
                name="auth"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                // onFinish={onLogIn}
                // onFinishFailed={onFinishFailed}
                autoComplete="on"
                style={{marginRight: 100, marginTop: 50}}
            >
                <Form.Item
                    label="Username"
                    name="userName"
                    rules={[{ required: true, message: 'Please input your username' }]}
                    validateStatus={(error !== 0) ? 'error' : 'success'}
                    help={(error === 1) ? 'Incorrect username or password' : (error === 2) ? 'Username already exists :c' : ''}
                    style={inputStyle}
                >
                    <Input value={userName} onChange={e => setUserName(e.target.value.trim())} style={inputStyle} />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password' }]}
                    validateStatus={(error === 1) ? 'error' : 'success'}
                    help={(error === 1) ? 'Incorrect username or password' : ''}
                    style={inputStyle}
                >
                    <Input.Password  value={password} onChange={e => setPassword(e.target.value)} style={inputStyle} />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" onClick={onLogIn} style={buttonStyle}>
                        Log In
                    </Button>
                    <Button type="primary" onClick={onRegister} style={buttonStyle}>
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}