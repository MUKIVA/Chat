import React, { useEffect, useMemo } from 'react'
import { useAction, useAtom } from '@reatom/react';
import 'antd/dist/antd.css';
import { Redirect } from 'react-router-dom';
import styles from "./MainLayout.module.css"
import { UploadOutlined, SendOutlined } from "@ant-design/icons"
import TextArea from 'antd/lib/input/TextArea';
import { UserData } from '../../auth/model/userData';
import { emptyMsg, MessageData } from '../model/MessageData';
import { messagesActions, messagesAtom } from '../model/message';
import { mainActions, mainAtoms } from '../model/main';
import { authActions, authAtoms } from '../../auth/model/auth';
import { MessageBlock } from './MessageBlock';
import { List } from 'antd';
import { HttpTransportType, HubConnectionBuilder } from '@microsoft/signalr';
import { urls } from '../../api/urls';

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
    const isAuth = useAtom(authAtoms.isAuthAtom)
    
    const currUser = useAtom(authAtoms.currUserAtom)
    const handleLogout = useAction(authActions.logout)

    const onLogOut = () => {
        handleLogout()
    };

    const messages = useAtom(messagesAtom)
    const text = useAtom(mainAtoms.textAtom)
    const editingMsgId = useAtom(mainAtoms.editingMessageIdAtom)
    const handleLoadMessages = useAction(mainActions.loadMessages)
    const handleSend = useAction(mainActions.sendMessage)
    const handleEdit = useAction(mainActions.editMessage)
    const handleSetText = useAction(mainActions.setText)
    const handleDeleteItem = useAction(messagesActions.removeMessage)
    const handleUpdateItem = useAction(messagesActions.updateMessage)

    useEffect(() => {
        handleLoadMessages()
    }, [isAuth, handleLoadMessages]);

    const messagesList: MessageData[] = useMemo(() => Object.values(messages), [messages]);

    const onEnter = () => {
        if (editingMsgId) {
            if (text) handleEdit({
                id: editingMsgId,
                text,
            })
        }
        else {
            if (text) {
                handleSend(createNewMessage(currUser, text))
            }
        }
    }

    const connection = useAtom(mainAtoms.connectionAtom)
    const handleSetConnection = useAction(mainActions.setConnection)

    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl(urls.HUB_URL, {
                skipNegotiation: true,
                transport: HttpTransportType.WebSockets,
            })
            .withAutomaticReconnect()
            .build();

        handleSetConnection(newConnection);
    }, [handleSetConnection]);

    useEffect(() => {
        if (connection) {
            connection.start()
                .then(() => {
                    connection.on('Receive', (id, message, userName, time) => {
                        handleUpdateItem({
                            id: id,
                            userName: userName,
                            text: message,
                            time: new Date(time),
                        })
                    });

                    connection.on('Delete', (id) => {
                        handleDeleteItem([id])
                    });

                    connection.on('Update', (id, msg) => {
                        const editedMsg: MessageData = messagesList.find(msg => {
                            return msg.id ===id
                        }) || emptyMsg
                        handleUpdateItem({...editedMsg, text: msg})
                    });
                    
                })
                .catch(e => {});
        }
    }, [connection, messagesList, handleDeleteItem, handleUpdateItem]);

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
                    dataSource={messagesList}
                    renderItem={(msg) => (
                        <MessageBlock msg={msg} />
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
