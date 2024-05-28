import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { request } from '../../utils/request';
import { DeleteOutlined } from '@ant-design/icons';
import dayjs from '../../utils/dayjs'
import AppAvatar from '../avatar'
import { Comment, Button, Tooltip, Input, Popconfirm, message } from 'antd'

const { TextArea } = Input

const CommentItem = props => {

    const { children, item, userInfo, articleId, commentId, replyId, replyVisible } = props
    const { user } = item
    const [value, setValue] = useState('')

    useEffect(() => {
        replyVisible && setValue('')
    }, [replyVisible])

    const handleChange = (e) => {
        setValue(e.target.value)
    }

    const handleKeyUp = (e) => {
        if (e.ctrlKey && e.keyCode === 13) {
            onSubmit()
        }
    }

    const onSubmit= async () => {
        if (!userInfo.userId) return message.warn('您未登陆，请登录后再试。');
        let obj = {
            content: value,
            userId: userInfo.userId,
            articleId: parseInt(articleId),
            commentId,
        }
        let res = await request('/createComment', {data: obj});
        if (res.status == 200) {
            message.success('回复成功！');
            props.setCommentList(res.data.rows);
            props.onReply({ commentId: 0, replyId: 0 });

        } else {
            message.error(res.errorMessage);
        }
    }

    // 删除评论
    function onDelete() {
        if (replyId) {
            // axios.delete(`/discuss/reply/${replyId}`).then(() => {
            //     const commentList = [...props.commentList]
            //     const tagetComment = commentList.find(c => c.id === commentId)
            //     tagetComment.replies = tagetComment.replies.filter(r => r.id !== replyId)
            //     props.setCommentList(commentList)
            // })
        } else {
            // axios.delete(`/discuss/comment/${commentId}`).then(() => {
            //     let commentList = [...props.commentList]
            //     commentList = commentList.filter(c => c.id !== commentId)
            //     props.setCommentList(commentList)
            // })
        }
    }

    const handleReply = () => {
        props.onReply({ commentId, replyId })
    }

    return (
        <Comment
            actions={[
                <span onClick={handleReply}>回复</span>,
                <>
                    {userInfo.role === 1 && (
                        <Popconfirm title={'是否删除该留言？'} cancelText='取消' okText='确认' onConfirm={onDelete}>
                            <DeleteOutlined />
                        </Popconfirm>
                    )}
                </>
            ]}
            author={<span>{user && user.username}</span>}
            avatar={<AppAvatar userInfo={user} />}
            content={
                <div>{item.content}</div>
            }
            datetime={
                <Tooltip title={item.createdAt}>
                    <span>{dayjs(item.createdAt).fromNow()}</span>
                </Tooltip>
            }>
            {replyVisible && (
                <div className='reply-form'>
                    <TextArea
                        placeholder={`回复${user.username}...`}
                        value={value}
                        onChange={handleChange}
                        onKeyUp={handleKeyUp}
                    />
                    <div className='reply-form-controls'>
                        <Button htmlType='submit' type='primary' disabled={!value.trim()} onClick={onSubmit}>
                            发布
                        </Button>
                    </div>
                </div>
            )}
            {children}
        </Comment>
    )
}

const CommentList = props => {
    const userInfo = useSelector(state => state.user);
    const { commentList, articleId } = props
    const [replyTarget, setReplyTarget] = useState({ commentId: 0, replyId: 0 })

    return (
        <div className='discuss-list'>
            {commentList.map(comment => (
                <CommentItem
                    item={comment}
                    key={comment.id}
                    articleId={articleId}
                    userInfo={userInfo}
                    commentId={comment.id}
                    setCommentList={props.setCommentList}
                    commentList={props.commentList}
                    onReply={setReplyTarget}
                    replyVisible={replyTarget.commentId === comment.id && !replyTarget.replyId}>
                    {comment.replies && comment.replies.map(reply => (
                        <CommentItem
                            item={reply}
                            key={reply.id}
                            articleId={articleId}
                            userInfo={userInfo}
                            commentId={comment.id}
                            replyId={reply.id}
                            setCommentList={props.setCommentList}
                            commentList={props.commentList}
                            onReply={setReplyTarget}
                            replyVisible={replyTarget.commentId === comment.id && replyTarget.replyId === reply.id}
                        />
                    ))}
                </CommentItem>
            ))}
        </div>
    )
}

export default CommentList
