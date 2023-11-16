import Header from '../app/layout/Header'
import { Content } from 'antd/es/layout/layout'
import { Card, Avatar, Form, Button, Row, Col, Typography, List, Image, Space } from 'antd';
import { LikeFilled, WechatFilled } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { Account } from '../app/models/Account';
import { useAppDispatch, useAppSelector } from '../app/stores/configureStore';
import { getAccountById } from '../app/stores/accountSlice';
import { useEffect, useState } from 'react';
import moment from 'moment';
import useLikePost from '../app/hooks/useLikePost';
import ButtonFollow from '../app/components/ButtonFollow';
import ModalComment from './ModalComment';

const { Title, Text } = Typography;

const ProfileFriendPage = () => {

    const { friendId } = useParams<{ friendId: any }>();
    const [friend, setFriend] = useState<Account | null>(null);
    const { cancelLike, pressLike, checkLike } = useLikePost();
    const [openModal, setOpenModal] = useState(false);
    const [contentId, setContentId] = useState('');
    const { account } = useAppSelector(state => state.account);
    const dispatch = useAppDispatch();

    useEffect(() => {
        loadAccount(friendId);
    }, []);

    const loadAccount = async (friendId: any) => {
        await dispatch(getAccountById(friendId)).unwrap().then(({ data, success }) => {
            if (success) setFriend(data);
        });
    };

    return (
        <>
            <Header />
            <ModalComment contentId={contentId} open={openModal} setOpen={setOpenModal} />
            <Content style={{ padding: '20px' }}>
                <Row>
                    <Col className="gutter-row" span={8}>
                        <Content style={{ padding: '20px' }}>
                            <Card title="Friend" style={{ width: '400px', margin: 'auto' }}>
                                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                                    <Avatar size={100} icon={<Image src={friend?.profileImageUrl} />} />
                                </div>
                                <Form.Item label="First Name">
                                    <strong>{friend?.firstName}</strong>
                                </Form.Item>
                                <Form.Item label="Last Name">
                                    <strong>{friend?.lastName}</strong>
                                </Form.Item>
                                <Form.Item label="Email" >
                                    <strong>{friend?.email}</strong>
                                </Form.Item>
                                <Form.Item>
                                    {account && <ButtonFollow type='primary' accountId={account?.id} friendId={friendId} />}
                                </Form.Item>
                            </Card>
                        </Content>
                    </Col>
                    <Col className="gutter-row" span={16}>
                        <Content style={{ padding: '20px' }}>
                            <Title style={{ textAlign: 'center' }} level={2}>Friend Post</Title>
                            <List
                                grid={{ gutter: 16, column: 3 }}
                                dataSource={friend?.contents}
                                renderItem={(post) => (
                                    <List.Item >
                                        <Card
                                            hoverable
                                            actions={[
                                                <Button
                                                    type="text"
                                                    style={{ color: !checkLike(post.id) ? '' : '#1677FF' }}
                                                    icon={<LikeFilled />}
                                                    onClick={() => !checkLike(post.id) ? pressLike(post.id) : cancelLike(post.id)}
                                                >
                                                    Like
                                                </Button>,
                                                <Button type='text' onClick={() => {
                                                    setOpenModal(true);
                                                    setContentId(post.id)
                                                }} icon={<WechatFilled />}>
                                                    Comment
                                                </Button>,
                                            ]}
                                        >
                                            <div style={{
                                                height: '7rem'
                                            }}>
                                                {post.contentImages && post.contentImages.length > 0 ?
                                                    post.message :
                                                    <h2>{post.message}</h2>
                                                }
                                                {post.contentImages && post.contentImages.length > 0 && (
                                                    <Space direction="horizontal" style={{ width: '100%' }} wrap>
                                                        {post.contentImages.map((url) => (
                                                            <Image key={url.id}
                                                                src={url.imageUrl}
                                                                alt={`Image ${url.id}`}
                                                                style={{ width: "6rem", height: "5rem" }} />
                                                        ))}
                                                    </Space>
                                                )}
                                                <Space direction="vertical">
                                                    <Text type="secondary">Posted on : {moment(post.created).format('DD/MM/YYYY')}</Text>
                                                </Space>
                                            </div>
                                        </Card>
                                    </List.Item>
                                )}
                            />
                        </Content>
                    </Col>
                </Row>
            </Content>
        </>
    )
}



export default ProfileFriendPage