import React, { useState, useEffect } from 'react'
import './index.less'
import { request } from '../../utils/request';
import { Button, Input, message, Form } from 'antd'
import MdEditor from '../../components/MdEditor'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom';
function WriteArticle() {
  const [form] = Form.useForm();
  const [isEdit, setISedit] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const userInfo = useSelector(state => state.user)
  useEffect(() => {
    if (location.state) {
      getArticle(location.state.editArticleId);
      setISedit(true);
    }
  }, [])

  //  获取文章详情
  const getArticle = async (id) => {
    let res = await request('/findArticleById', { data: { id } });
    if (res.status == 200) {
      let data = res.data;
      form.setFieldsValue({
        title: data.title,
        content: data.content,
      })
    } else {
      message.error(res.errorMessage);
    }
  }

  const submit = (value) => {
    if (isEdit) {
      edit(value);
    } else {
      add(value);
    }
  }

  const edit = async (value) => {
    if (!value.title) {
      message.warning('请输入标题！');
      return;
    }
    if (!value.content) {
      message.warning('你的内容捏？');
      return;
    }
    let obj = {
      title: value.title,
      content: value.content,
      articleId: location.state.editArticleId,
    };
    const res = await request('/editArticle', { data: obj });
    if (res.status == 200) {
      message.success('修改成功！');
      navigate('/help');
    } else {
      message.error(res.errorMessage);
    }
  }

  const add = async (value) => {
    if (!value.title) {
      message.warning('请输入标题！');
      return;
    }
    if (!value.content) {
      message.warning('你的内容捏？');
      return;
    }
    let authorId = userInfo && userInfo.userId;
    let obj = {
      title: value.title,
      content: value.content,
      authorId,
    };
    const res = await request('/create', { data: obj });
    if (res.status == 200) {
      message.success('发布成功！');
      navigate('/');
    } else {
      message.error(res.errorMessage);
    }
  }

  const goBack = () => {
    if(isEdit) {
      navigate('/help', { state: { key: '1' } });
    } else {
      navigate('/');
    }
  }

  return (
    <div className='admin-edit-article'>
      <div>
        <Form
          name="normal_login"
          form={form}
          onFinish={submit}
        >
          <Form.Item
            name="title"
          >
            <Input
              placeholder='请输入文章标题'
              className='title-input'
              bordered={false}
            />
          </Form.Item>
          <Form.Item
            name="content"
          >
            <MdEditor />
          </Form.Item>
          <Form.Item
            name="title"
          >
            <div className='write-button'>
              <Button type='primary' htmlType="submit">{isEdit ? '修改' : '完成'}</Button>
              <Button type='primary' onClick={goBack}>返回</Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default WriteArticle
