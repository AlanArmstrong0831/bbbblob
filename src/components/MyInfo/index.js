import React, { useState, useEffect } from 'react'
import { Input, Form, message, Button } from 'antd'
import { request } from '../../utils/request';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { edit } from '../../redux/user/actions'
import './index.less'
/**
 * 我的信息
*/
function MyInfo(props) {
    const [userId, setUserId] = useState(props.userInfo.userId);
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.user);
    useEffect(() => {
        form.setFieldsValue({
            username: userInfo.username,
            email: userInfo.email,
            description: userInfo.description,
        })
    }, [props.userInfo.userId])

    const submit = async (value) => {
        let obj = {...value, userId}
        let res = await request('/editMyInfo', { data: obj });
        if (res.status == 200) {
            message.success('保存成功');
            dispatch(edit(value));
        } else {
            message.error(res.errorMessage);
        }
    }

    const formItemLayout = {
        labelCol: {
            span: 4,
        },
        wrapperCol: {
            span: 14,
        },
    }

    return (
        <div className='help-article'>
            <Form
                {...formItemLayout}
                name="normal_login"
                form={form}
                onFinish={submit}
            >
                <Form.Item
                    label='用户名'
                    name="username"
                >
                    <Input
                        className='title-input'
                    />
                </Form.Item>
                <Form.Item
                    label='邮箱'
                    name="email"
                >
                    <Input
                        className='title-input'
                    />
                </Form.Item>
                <Form.Item
                    label='个人简介'
                    name="description"
                >
                    <Input
                        className='title-input'
                    />
                </Form.Item>
                <Form.Item
                    style={{ textAlign: 'center' }}
                >
                    <Button type='primary' htmlType="submit">保存</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default MyInfo
