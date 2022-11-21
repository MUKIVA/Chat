import React from "react"
import { Avatar, Comment, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"
import { MessageData } from "../model/MessageData";
import { useAction, useAtom } from "@reatom/react";
import { mainActions } from "../model/main";
import styles from "./MessageBlock.module.css"
import { authAtoms } from "../../auth/model/auth";
import { convertDateToString } from "../../core/utils/utils";

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

    const commentStyle = () => {
        if (currUser?.name === msg.userName) {
            return styles.msgBlock_default + ' ' + styles.msgBlock_curr
        }
        return styles.msgBlock_default
    }

    return (
        <Comment
            actions={[]}
            author={(currUser?.name !== msg.userName) ? <span className={styles.userName}>{msg.userName}</span> : <></>}
            avatar={(currUser?.name !== msg.userName) ? <Avatar className={styles.avatar} size={40}>{msg.userName[0]}</Avatar> : <></>}
            content={<>
                <p className={styles.text}>{msg.text}</p>
                {(currUser?.name === msg.userName) ?
                    <div className={styles.buttonsBlock}>
                        <EditOutlined className={styles.button} onClick={() => onEditClick(msg)} />
                        <DeleteOutlined className={styles.button} onClick={() => handleDel(msg.id)} />
                    </div> : 
                    <></>
                }
            </>}
            datetime={
                <Tooltip>
                    <span className={styles.time}>{convertDateToString(msg.time)}</span>
                </Tooltip>
            }
            className={commentStyle()}
            key={msg.id}
        />
    )
}