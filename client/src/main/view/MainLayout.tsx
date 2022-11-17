import React, { useState } from 'react'
import { useAction, useAtom } from '@reatom/react';
import { Avatar, Comment, Tooltip } from 'antd';
import { del, edit, editing, emptyMsg, MessageData, messagesListAtom, send, setText, textAtom } from '../model/MessageData';
import 'antd/dist/antd.css';
import { Redirect } from 'react-router-dom';
import { currUserAtom, isAuthAtom, logout } from '../../auth/model/auth';
import styles from "./MainLayout.module.css"
import { UploadOutlined, SendOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons"
import TextArea from 'antd/lib/input/TextArea';
import { UserData } from '../../auth/model/userData';

function dateToString(date: Date): string {
    return date.toLocaleTimeString() + ' ' + date.toLocaleDateString();
}

const msgStyle: React.CSSProperties = {
    marginLeft: 15,
    marginRight: 15,
}

const currUserMsgStyle: React.CSSProperties = {
    ...msgStyle,
    alignSelf: 'flex-start',
}

const msgButtonStyle: React.CSSProperties = {
    marginLeft: 10,
    color: '#c9c9c9'
}

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

function createNewMessage(currUser: UserData|null, index: number, text: string): MessageData {
    return {
        id: (index + 1).toString(),
        userName: currUser?.name || '',
        text: text,
        time: new Date(),
    }
}

export function MainLayout() {                                                                                                                                                                                                                                                                                                                                                                                          
    const currUser = useAtom(currUserAtom)
    const messagesList = useAtom(messagesListAtom)
    const text = useAtom(textAtom)
    const isAuth = useAtom(isAuthAtom)
    const handleLogout = useAction(logout)
    const handleSend = useAction(send)
    const handleEdit = useAction(edit)
    const handleDel = useAction(del)
    const handleSetText = useAction(setText)
    const handleSetEditing = useAction(editing)

    const [editingMsg, setEditingMsg] = useState<MessageData|null>(null);

    const onLogOut = () => {
        handleLogout()
        console.log('Logout');
    };

    const onEditClick = (msg: MessageData) => {
        setEditingMsg(msg);
        handleSetEditing(msg.text);
        console.log('edit:', msg.id)
    };

    const onEnter = () => {
        if (editingMsg) {
            if (text) handleEdit({msg: editingMsg || emptyMsg, newText: text})
            else setEditingMsg(null)
        }
        else {
            if (text) handleSend(createNewMessage(currUser, messagesList.length, text))
        }
    }

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
                <div className={styles.list}>
                    {messagesList.slice(0).reverse().map((msg: MessageData) => <Comment
                            actions={[]}
                            author={(currUser?.name !== msg.userName) ? <a className={styles.userName}>{msg.userName}</a> : <></>}
                            avatar={(currUser?.name !== msg.userName) ? <Avatar style={{ backgroundColor: '#f56a00', fontSize: 20 }} size={40}>{msg.userName[0]}</Avatar> : <></>}
                            content={<>
                                <p className={styles.text}>{msg.text}</p>
                                {(currUser?.name === msg.userName) ?
                                    <div className={styles.buttonsBlock}>
                                        <EditOutlined size={22} style={msgButtonStyle} onClick={() => onEditClick(msg)} />
                                        <DeleteOutlined size={22} style={msgButtonStyle} onClick={() => handleDel(msg.id)} />
                                    </div> : 
                                    <></>
                                }
                            </>}
                            datetime={
                                <Tooltip>
                                    <span style={{margin:-8}}>{dateToString(msg.time)}</span>
                                </Tooltip>
                            }
                            style={(currUser?.name !== msg.userName) ? currUserMsgStyle : msgStyle}
                            key={msg.id}
                        />)}
                </div>
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