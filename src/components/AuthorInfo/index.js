import React, { useState, useEffect } from 'react'
import { Card, Divider, Tag } from 'antd'
import { request } from '../../utils/request';
import { EyeOutlined, TagOutlined, CommentOutlined } from '@ant-design/icons';
import { calcCommentsCount } from '../../utils'
import './index.less'
/**
 * 用户信息卡片
*/
function AuthorInfo(props) {
    useEffect(() => {
     
    }, [])

    const getRecommendList = async () => {
        
    }

    return (
        <Card style={{ margin: '16px auto' }}>
            <div className='au-card'>
                <div className='au-name'>ALAN</div>
                
            </div>
        </Card>
    )
}

export default AuthorInfo
