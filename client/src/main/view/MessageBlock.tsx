import React from "react"
import { Avatar, Comment, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"
import { MessageData } from "../model/MessageData";
import { useAction, useAtom } from "@reatom/react";
import { mainActions } from "../model/main";
import styles from "./MainLayout.module.css"
import { authAtoms } from "../../auth/model/auth";

function dateToString(date: Date): string {
    return date.toLocaleTimeString() + ' ' + date.toLocaleDateString();
}

const avatarStyle: React.CSSProperties = {
    backgroundColor: '#f56a00',
    fontSize: 20
}

const msgStyle: React.CSSProperties = {
    marginLeft: 15,
    marginRight: 15,
}

export const currUserMsgStyle: React.CSSProperties = {
    ...msgStyle,
    //marginLeft: 100,
    alignSelf: 'flex-end',
}

const msgButtonStyle: React.CSSProperties = {
    marginLeft: 10,
    color: '#c9c9c9'
}

type MessageBlockProps = {
    msg: MessageData,
}

export function MessageBlock({
    msg,
}: MessageBlockProps) {
    const currUser = useAtom(authAtoms.currUserAtom)
    const handleDel = useAction(mainActions.deleteMessage)
    const handleSetText = useAction(mainActions.setText)
    const handleSetEditingMsg = useAction(mainActions.setEditingMessage)

    const onEditClick = (msg: MessageData) => {
        handleSetEditingMsg(msg)
        handleSetText(msg.text)
    };
    
    return (
        <Comment
            actions={[]}
            author={(currUser?.name !== msg.userName) ? <span className={styles.userName}>{msg.userName}</span> : <></>}
            avatar={(currUser?.name !== msg.userName) ? <Avatar style={avatarStyle} size={40}>{msg.userName[0]}</Avatar> : <></>}
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
            style={(currUser?.name === msg.userName) ? currUserMsgStyle : msgStyle}
            key={msg.id}
        />
    )
}