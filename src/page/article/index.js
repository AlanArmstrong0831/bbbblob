import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import './index.less'
import { Divider, Spin, message } from 'antd'
import Header from '../../components/header';
import Recommend from '../../components/Recommend'
import AuthorInfo from '../../components/AuthorInfo'
import Discuss from '../../components/Discuss';
import { request } from '../../utils/request';
import { EditOutlined, EyeOutlined, CommentOutlined } from '@ant-design/icons';
import { calcCommentsCount } from '../../utils'
/**
 * 文章内容
*/
function Article() {
    const { id } = useParams()
    const [loading, setLoading] = useState(false);
    const [listData, setData] = useState([]);
    const [article, setArticle] = useState({
        title: '',
        content: '',
        createdAt: '',
        comments: [],
        viewCount: 0,
        goodCount: 0,
    });
    const { content, title, createdAt, viewCount, comments, goodCount } = article;

    useEffect(() => {
        getArticle();
        getArticleList();
    },[id])

    //  获取推荐列表
    const getArticleList = async () => {
        let obj = {};
        let res = await request('/getArticleList', {data: obj});
        setData(res?.data.rows);
    }

    //  获取文章详情
    const getArticle = async () => {
        let res = await request('/findArticleById', {data: {id}});
        if (res.status == 200) {
            let data = res.data;
            data.content = data.content.replace(/(\n|\r|\r\n|↵)/g, '<br />');
            setArticle(data);
        } else {
            message.error(res.errorMessage);
        }
    }

    //  刷新子组件传来的评论列表
    const setCommentList = (commentList) => {
        setArticle({...article, comments: commentList});
    }

    return (
        <Spin tip='Loading...' spinning={loading}>
            {/* <Header /> */}
            <article className='app-article'>
                <div className='post-header'>
                    <h1 className='post-title'>{title}</h1>
                    <div className='article-desc'>
                        <span className='post-time'>
                            <EditOutlined />
                            &nbsp; 发布于： &nbsp;
                            <span>{createdAt.slice(0, 10)}</span>
                        </span>
                        {/* <ArticleTag tagList={tags} categoryList={categories} /> */}
                        <Divider type='vertical' />
                        <a className='comment-count' href='#discuss' style={{ color: 'inherit' }}>
                            <CommentOutlined />
                            <span style={{ marginRight: 5 }}> {calcCommentsCount(comments)}</span>
                        </a>
                        <EyeOutlined style={{ marginRight: 2 }} />
                        <span>{viewCount}</span>
                    </div>
                </div>
                <div className='post-content'>
                    <div className='article-userInfo'>
                        <AuthorInfo></AuthorInfo>
                        <Recommend articleList={listData}></Recommend>
                    </div>
                    <div className='article-detail'>
                        <div dangerouslySetInnerHTML={{ __html: content }} />
                        <Discuss articleId={id} commentList={comments} setCommentList={setCommentList} />
                    </div>
                </div>
            </article>
        </Spin>
    )
}

export default Article
