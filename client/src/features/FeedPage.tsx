import { useEffect, useState } from 'react'
import { Card, List, Avatar, Typography, Space, Image, Layout, Empty, Button } from 'antd';
import Header from '../app/layout/Header';
import { useAppDispatch, useAppSelector } from '../app/stores/configureStore';
import { contentSelectors, getFriendContents } from '../app/stores/contentSlice';
import { LikeFilled, WechatFilled } from '@ant-design/icons';
import Meta from 'antd/es/card/Meta';
import moment from 'moment';
import useLikePost from '../app/hooks/useLikePost';
import { Link } from 'react-router-dom';
import ModalComment from './ModalComment';

const { Title, Text } = Typography;

const { Content } = Layout;

const FeedPage = () => {

  const dispatch = useAppDispatch();

  const contents = useAppSelector(contentSelectors.selectAll);

  const [openModal , setOpenModal] = useState(false);
  const [contentId , setContentId] = useState('');

  const { contentsLoaded } = useAppSelector(state => state.content);

  const { cancelLike , pressLike , checkLike } = useLikePost();

  useEffect(() => {
    if (!contentsLoaded) dispatch(getFriendContents());
  }, [contentsLoaded, dispatch]);

  return (
    <>
      <Header />
      <ModalComment contentId={contentId} open={openModal} setOpen={setOpenModal} />
      <Content style={{ padding: '20px' }}>
        <Title style={{ textAlign: 'center' }} level={2}>Feet Post </Title>
        <List
          grid={{ gutter: 16, column: 3 }}
          dataSource={contents}
          locale={{ emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="There are no posts Please add friends." /> }}
          renderItem={(post) => {
            return <List.Item >
              
              <Card
                hoverable
                title={<Link to={`/profileFriend/${post.account.id}`} >
                <Meta
                  avatar={<Avatar src={post.account.profileImageUrl} />}
                  title={post.account.firstName + ' ' + post.account.lastName}
                /></Link>}
                actions={[
                  <Button 
                    type="text" 
                    style={{ color : !checkLike(post.id) ? '' : '#1677FF' }}
                    icon={<LikeFilled style={{ fontSize: '1.5rem' }} />}
                    onClick={() => !checkLike(post.id) ? pressLike(post.id) : cancelLike(post.id)}
                    >
                    Like 
                  </Button>,
                  <Button type='text' onClick={() => {
                    setOpenModal(true);
                    setContentId(post.id)
                  }} icon={<WechatFilled style={{ fontSize: '1.5rem' }} />}>
                    Comment
                  </Button>,
                ]}>
                {post.contentImages && post.contentImages.length > 0 ?
                  post.message :
                  <h2>{post.message} </h2>
                }
                {post.contentImages && post.contentImages.length > 0 && (
                  <Space direction="horizontal" style={{ width: '100%' }} wrap>
                    {post.contentImages.map((url) => (
                      <Image
                        key={url.id}
                        src={url.imageUrl}
                        alt={`Image ${url.id}`}
                        style={{ width: "12rem", height: "10rem" }} />
                    ))}
                  </Space>
                )}
                <Space direction="vertical">
                  <Text type="secondary">Posted on : {moment(post.created).format('DD/MM/YYYY')}</Text>
                </Space>
              </Card>
            </List.Item>
          }}
        />
      </Content>
    </>
  )
}

export default FeedPage