import { Button, message, Avatar, Dropdown, Badge } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AppAvatar from '../avatar';
import { useDispatch } from 'react-redux'
import { useListener } from '../../hooks/useBus';
import { get } from '../../utils/storage';
import { loginout } from '../../redux/user/actions'
import { FileTextOutlined, IdcardOutlined, KeyOutlined } from '@ant-design/icons';
import './index.less'

function Header() {
    const [loginStatus, setLoginStatus] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const [avatar, setAvatar] = useState('');
    const [answer, setAnswer] = useState([]);
    const [socket, setSocket] = useState();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const items = [
        {
            key: '1',
            label: (
                <div onClick={() => navigate('/help', { state: { key: '1' } })} >
                    我的文章
                </div>
            ),
            icon: <FileTextOutlined />,
        },
        {
            key: '2',
            label: (
                <div onClick={() => navigate('/help', { state: { key: '2' } })}>
                    个人信息
                </div>
            ),
              icon: <IdcardOutlined />,
        },
        {
            key: '3',
            label: (
                <div onClick={() => navigate('/help', { state: { key: '3' } })}>
                    修改密码
                </div>
            ),
            icon: <KeyOutlined />,
        },
    ];
    useEffect(() => {
        const userInfo = get('userInfo');
        if (userInfo) {
            setLoginStatus(true);
            setUserInfo(userInfo);
        }
    }, [])

    //  监听userInfo变化
    useListener('getLogin', type => {
        setLoginStatus(true);
        setUserInfo(type);
    })

    //  退出登录
    const exit = () => {
        dispatch(loginout());
        setUserInfo({});
        setLoginStatus(false);
        message.success('退出登录辽!');
    }

    return (
        <div className='header'>
            <div className='header_left'>
                <div>309车管所</div>
            </div>
            <div className='header_right'>
                {
                    loginStatus ? (
                        <div>
                            <Dropdown menu={{ items }} placement='bottom'>
                                {/* <Badge count={answer.length}> */}
                                <Avatar src='bilan.jpeg' style={{ cursor: 'pointer' }} size={36} />
                                {/* </Badge> */}
                            </Dropdown>
                            <Button onClick={() => navigate('/writeArticle')} className="button">写文章</Button>
                            <Button className="button" onClick={exit}>退出</Button>
                        </div>
                    ) : (
                        <div>
                            <Button onClick={() => navigate('/login', { state: { nowStatus: 'login' } })} className="button">登录</Button>
                            <Button onClick={() => navigate('/login', { state: { nowStatus: 'register' } })} className="button">
                                注册
                            </Button>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Header
