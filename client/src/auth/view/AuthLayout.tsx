import React from 'react'
import { useAction, useAtom } from '@reatom/react'
import { Redirect } from 'react-router-dom'
import { Button, Form, Input } from 'antd'
import styles from "./Auth.module.css"
import { authActions, authAtoms } from '../model/auth'

const buttonStyle: React.CSSProperties = {
    backgroundColor: '#2b2b2b',
    borderColor: '#2b2b2b',
    margin: 5,
}

const inputStyle: React.CSSProperties = {
    width: 300,
}

export function AuthLayout() {   
    const isAuth = useAtom(authAtoms.isAuthAtom)
    const handleLogin = useAction(authActions.login)
    const handleRegister = useAction(authActions.register)

    const userName = useAtom(authAtoms.userNameAtom)
    const password = useAtom(authAtoms.passwordAtom)

    const handleSetUserName = useAction(authActions.setUserName)
    const handleSetPassword = useAction(authActions.setPassword)

    const loginError = useAtom(authAtoms.loginErrorAtom)
    const registerError = useAtom(authAtoms.registerErrorAtom)
    const userNameError = useAtom(authAtoms.userNameErrorAtom)

    const onLogIn = () => {
        if (userName && password) {
            handleLogin({
                name: userName,
                password: password,
            })
        }
    };
    
    const onRegister = () => {
        if (userName && password) {
            handleRegister({
                name: userName,
                password: password,
            })
        }
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
                autoComplete="on"
                style={{marginRight: 100, marginTop: 50}}
            >
                <Form.Item
                    label="Username"
                    name="userName"
                    //rules={[{ required: true, message: 'Please input your username' }]}
                    validateStatus={(loginError || registerError || userNameError) ? 'error' : 'success'}
                    help={
                        (loginError) ? 'Incorrect username or password' : 
                        (registerError) ? 'Username already exists :c' : 
                        (userNameError) ? 'Incorrect username' : ''
                    }
                    style={inputStyle}
                >
                    <Input value={userName} onChange={e => handleSetUserName(e.target.value.trim())} style={inputStyle} />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    //rules={[{ required: true, message: 'Please input your password' }]}
                    validateStatus={(loginError) ? 'error' : 'success'}
                    help={(loginError) ? 'Incorrect username or password' : ''}
                    style={inputStyle}
                >
                    <Input.Password  value={password} onChange={e => handleSetPassword(e.target.value)} style={inputStyle} />
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