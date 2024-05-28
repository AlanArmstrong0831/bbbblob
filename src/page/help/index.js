import React, { useState, useEffect } from 'react';
import './index.less';
import { useNavigate } from 'react-router-dom';
import { Tabs, Button } from 'antd';
import MyArticle from '../../components/MyArticle';
import MyInfo from '../../components/MyInfo';
import ChangePassword from '../../components/changePassword';
import { useSelector } from 'react-redux';
import { FileTextOutlined, IdcardOutlined, KeyOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';
/**
 * 帮助中心
*/
function Help() {
    const userInfo = useSelector(state => state.user);
    const [active, setActive] = useState('1');
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        console.log(123);
        setActive(location.state.key);
    })

    const items = [
        {
            label: (<div><FileTextOutlined />我的文章</div>),
            key: '1',
            children: <MyArticle userInfo={userInfo}></MyArticle>,
          },
          {
            label: (<div><IdcardOutlined />个人信息</div>),
            key: '2',
            children: <MyInfo userInfo={userInfo}></MyInfo>,
          },
          {
            label: (<div><KeyOutlined />修改密码</div>),
            key: '3',
            children: <ChangePassword userInfo={userInfo}></ChangePassword>,
          },
    ]

    return (
        <div className='help'>
            <Tabs
                tabPosition='left'
                items={items}
                activeKey={active}
                onChange={(active) => setActive(active)}
            />
            <div className='back'>
                <Button className='back-btn' type='goast' onClick={() => navigate('/')}>返回主页</Button>
            </div>
        </div>
    )
}

export default Help
