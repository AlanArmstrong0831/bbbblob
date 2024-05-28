import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Divider } from 'antd';
import { EyeOutlined, TagOutlined, CommentOutlined } from '@ant-design/icons';

import './index.less'
/**
 * 推荐文章
*/
function Recommend(props) {
    const [listData, setData] = useState([])
    const navigate = useNavigate();
    useEffect(() => {
        setData(props.articleList);
    }, [props.articleList])

    return (
        <Card style={{ margin: '16px auto' }}>
            <div className='re-card'>
                <div className='re-title'>今日推荐</div>
                <div className='re-list'>
                    {
                        listData.length ? (
                            listData.map((item, index) => <p onClick={() => navigate(`/article/${item.id}`)} key={index} className='re-content'>{index + 1} 、&nbsp; {item.title}</p>)
                        ) : null
                    }
                </div>
            </div>
        </Card>
    )
}

export default Recommend
