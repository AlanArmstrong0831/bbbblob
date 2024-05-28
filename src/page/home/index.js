import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { List, Space, message, Input } from 'antd' //引入antd中的Button组件
// import Header from '../../components/header';
import ArticleCard from '../../components/ArticleCard'
import { request } from '../../utils/request';
import './index.less'
import Recommend from '../../components/Recommend';
const { Search } = Input;

export default function Home() {
    const [change, setChange] = useState(false)
    const [listData, setData] = useState([])
    const [pageNum, setPageNum] = useState(1)
    const [keyword, setKeyword] = useState('')
    const navigate = useNavigate();
    useEffect(() => {
        getArticleList();
    }, [])

    //  获取文章列表
    const getArticleList = async (pageNum = 1, pageSize = 10, keyword = '') => {
        let obj = {pageNum, pageSize, keyword};
        const res = await request('/getArticleList', { data: obj });
        setData(res?.data.rows);
    }

    const handlePressEnter = () => {
        getArticleList(1, 10, keyword);
    }

    return (
        <div className='home_content'>
            {/* <Header /> */}
            <div className='home_under_content'>
                <div className='home_left_content'>
                    <Recommend articleList={listData}></Recommend>
                </div>
                <div className='home_right_content'>
                    <div className='home_search'>
                        <Search
                            placeholder="请输入车主/文章标题"
                            enterButton
                            onChange={(e) => setKeyword(e.target.value)}
                            value={keyword}
                            onPressEnter={handlePressEnter}
                            onSearch={handlePressEnter}
                            style={{ width: '50%' }} 
                        />
                    </div>
                    <div className='home_list'>
                        <List
                            dataSource={listData}
                            renderItem={item => (
                                <List.Item onClick={() => navigate(`/article/${item.id}`)}>
                                    <ArticleCard articleInfo={item}></ArticleCard>
                                </List.Item>
                            )}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
