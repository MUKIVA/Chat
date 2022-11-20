import React, { useEffect, useState } from 'react'
import { useAction, useAtom } from '@reatom/react';
import 'antd/dist/antd.css';
import { Redirect } from 'react-router-dom';
import styles from "./MainLayout.module.css"
import { UploadOutlined, SendOutlined } from "@ant-design/icons"
import TextArea from 'antd/lib/input/TextArea';
import { UserData } from '../../auth/model/userData';
import { MessageData } from '../model/MessageData';
import { messagesActions, messagesAtom } from '../model/message';
import { connectionAtom, mainActions, setConnection, setText, textAtom } from '../model/main';
import { authActions, authAtoms } from '../../auth/model/auth';
import { MessageBlock } from './MessageBlock';
import { List } from 'antd';
import { HttpTransportType, HubConnectionBuilder } from '@microsoft/signalr';

const logoutButtonStyle: React.CSSProperties = {
    marginRight: 20,
    color: '#ffffff',
    fontWeight: 'bold'
}

const sendButtonStyle: React.CSSProperties = {
    marginLeft: 12,
    marginRight: 0,
    marginBottom: 8,
    color: '#2b2b2b',
}

function createNewMessage(currUser: UserData|null, text: string): Omit<MessageData, 'id'> {
    return {
        userName: currUser?.name || '',
        text: text,
        time: new Date(),
    }
}

export function MainLayout() {                                                                                                                                                                                                                                                                                                                                                                                          
    const currUser = useAtom(authAtoms.currUserAtom)
    const messagesList = useAtom(messagesAtom)
    const text = useAtom(textAtom)
    const isAuth = useAtom(authAtoms.isAuthAtom)
    const handleLogout = useAction(authActions.logout)
    const handleLoadMessages = useAction(mainActions.loadMessages)
    const handleSend = useAction(mainActions.sendMessage)
    const handleEdit = useAction(mainActions.editMessage)
    const handleSetText = useAction(setText)
    const handleDeleteItem = useAction(messagesActions.removeMessage)
    const handleUpdateItem = useAction(messagesActions.updateMessage)
    
    const [editingMsg, setEditingMsg] = useState<MessageData|null>(null);

    const onLogOut = () => {
        handleLogout()
        console.log('Logout');
    };

    const onEnter = () => {
        if (editingMsg) {
            if (text) handleEdit({...editingMsg, text: text})
            else setEditingMsg(null)
        }
        else {
            if (text) handleSend(createNewMessage(currUser, text))
        }
    }

    useEffect(() => {
        handleLoadMessages()
    }, [isAuth]);

    const connection = useAtom(connectionAtom)
    const handleSetConnection = useAction(setConnection)

    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl('http://localhost:5000/chat', {
                skipNegotiation: true,
                transport: HttpTransportType.WebSockets,
            })
            .withAutomaticReconnect()
            .build();

        handleSetConnection(newConnection);
    }, []);

    useEffect(() => {
        if (connection) {
            connection.start()
                .then(result => {
                    connection.on('Receive', (id, message, userName, time) => {
                        //console.log(id, message, userName, new Date(time))
                        handleUpdateItem({
                            id: id,
                            userName: userName,
                            text: message,
                            time: new Date(time),
                        })
                    });

                    connection.on('Delete', (id) => {
                        console.log(id)
                        handleDeleteItem([id])
                    });

                    connection.on('Update', (id, msg) => {
                        console.log(id, msg)
                        const editedMsg: MessageData = Object.values(messagesList).filter((item) => item.id === id)[0]//
                        handleUpdateItem({...editedMsg, text: msg})
                    });
                    
                })
                .catch(e => console.log('Connection failed: ', e));
        }
    }, [connection]);

    if (!isAuth) {
        return <Redirect to={'/auth'} />
    }

    return (
        <div className={styles.content}>
            <div className={styles.panel}>
                <label className={styles.currUser}>{currUser?.name}</label>
                <UploadOutlined rotate={90} style={logoutButtonStyle} size={100} onClick={onLogOut} />
            </div>
            <div className={styles.chat}>
                <List
                    className={styles.list}
                    split={false}
                    itemLayout="horizontal"
                    dataSource={Object.values(messagesList)}
                    renderItem={(msg?) => (
                        <MessageBlock msg={msg} setEditingMsg={setEditingMsg} />
                    )}
                />
                <div className={styles.enterBlock}>
                    <TextArea
                        value={text}
                        onChange={e => handleSetText(e.target.value.trim())}
                        placeholder="Type here..."
                        autoSize={{ minRows: 1, maxRows: 5 }}
                        className={styles.textInput}
                    />
                    <SendOutlined style={sendButtonStyle} onClick={onEnter} />
                </div>
            </div>
        </div>
    )
}
