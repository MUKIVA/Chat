import React, { useEffect, useMemo } from 'react'
import { useAction, useAtom } from '@reatom/react';
import 'antd/dist/antd.css';
import { Redirect } from 'react-router-dom';
import styles from "./MainLayout.module.css"
import { UploadOutlined, SendOutlined } from "@ant-design/icons"
import { MessageData } from '../model/MessageData';
import { messagesActions, messagesAtom } from '../model/message';
import { mainActions, mainAtoms } from '../model/main';
import { authActions, authAtoms } from '../../auth/model/auth';
import { MessageBlock } from './MessageBlock';
import { HttpTransportType, HubConnectionBuilder } from '@microsoft/signalr';
import { urls } from '../../api/urls';
import { createSendingMessage } from '../../core/utils/utils';

export function MainLayout() {                                                                                                                                                                                                                                                                                                                                                                                          
    const isAuth = useAtom(authAtoms.isAuthAtom)
    
    const currUser = useAtom(authAtoms.currUserAtom)
    const handleLogout = useAction(authActions.logout)

    const onLogOut = () => {
        handleLogout()
    };

    const messages = useAtom(messagesAtom)
    const text = useAtom(mainAtoms.textAtom)
    const editingMsg = useAtom(mainAtoms.editingMessageAtom)
    const handleLoadMessages = useAction(mainActions.loadMessages)
    const handleSend = useAction(mainActions.sendMessage)
    const handleEdit = useAction(mainActions.editMessage)
    const handleSetText = useAction(mainActions.setText)
    const handleDeleteItem = useAction(messagesActions.removeMessage)
    const handleUpdateItem = useAction(messagesActions.updateMessage)

    useEffect(() => {
        handleLoadMessages()
    }, [isAuth, handleLoadMessages]);

    const messagesList: MessageData[] = useMemo(() => Object.values(messages).reverse(), [messages]);

    const onSend = () => {
        if (editingMsg) {
            if (text) handleEdit({msg: editingMsg, newText: text})
        }
        else {
            if (text) {
                handleSend(createSendingMessage(currUser, text))
            }
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if ((e.key === 'Enter') && !(e.shiftKey)) {
            e.preventDefault()
            onSend()
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
                            id,
                            userName,
                            text: message,
                            time: new Date(time),
                        })
                    });

                    connection.on('Delete', (id) => {
                        handleDeleteItem([id])
                    });

                    connection.on('Update', (msg) => {
                        handleUpdateItem({
                            id: msg.id,
                            userName: msg.userName,
                            text: msg.text,
                            time: new Date(msg.time)
                        })
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
                <UploadOutlined rotate={90} className={styles.exitButton} onClick={onLogOut} />
            </div>
            <div className={styles.chat}>
                <div className={styles.list}>
                    {messagesList.map(msg => 
                        <MessageBlock msg={msg} key={msg.id} />
                    )}
                </div>
                <div className={styles.enterBlock}>
                    <textarea
                        value={text}
                        onChange={e => handleSetText(e.target.value)}
                        onKeyDown={handleKeyDown}
                        autoFocus
                        rows={1}
                        placeholder="Type here..."
                        className={styles.textInput}
                    ></textarea>
                    <SendOutlined
                        className={styles.sendButton}
                        onClick={onSend}
                    />
                </div>
            </div>
        </div>
    )
}
