import Header from '../app/layout/Header'
import { Content } from 'antd/es/layout/layout'
import { Card, Avatar, Form, Button, Row, Col, Typography, List, Image, Space } from 'antd';
import { LikeFilled, WechatFilled } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../app/stores/configureStore';
import { PlusCircleFilled } from '@ant-design/icons';
import moment from 'moment';
import useLikePost from '../app/hooks/useLikePost';
import ModalComment from './ModalComment';
import { useEffect, useState } from 'react';
import ModalFormContent from './ModalFormContent';
import { getCurrentAccount } from '../app/stores/accountSlice';


const { Title, Text } = Typography;

const ProfilePage = () => {
    const { account } = useAppSelector(state => state.account);
    const { cancelLike, pressLike, checkLike } = useLikePost();
    const [openModal, setOpenModal] = useState(false);
    const [contentId, setContentId] = useState('');
    const [open , setOpen] = useState(false);
    
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getCurrentAccount())
    } , [])

    return (
        <>
            <Header />
            {account ? <ModalFormContent accountId={account.id} open={open} setOpen={setOpen} /> : ""}
            <ModalComment contentId={contentId} open={openModal} setOpen={setOpenModal} />
            <Content style={{ padding: '20px' }}>
                <Row>
                    <Col className="gutter-row" span={8}>
                        <Content style={{ padding: '20px' }}>
                            <Card title="My Profile" style={{ width: '400px', margin: 'auto' }}>
                                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                                    <Avatar size={100} icon={<Image src={account?.profileImageUrl} />} />
                                </div>
                                <Form.Item label="First Name">
                                    <strong>{account?.firstName}</strong>
                                </Form.Item>
                                <Form.Item label="Last Name">
                                    <strong>{account?.lastName}</strong>
                                </Form.Item>
                                <Form.Item label="Email" >
                                    <strong>{account?.email}</strong>
                                </Form.Item>
                                <Form.Item>
                                    <Button type='primary' onClick={() => setOpen(true)} icon={<PlusCircleFilled />}>
                                        Create a post
                                    </Button>
                                </Form.Item>
                            </Card>
                        </Content>
                    </Col>
                    <Col className="gutter-row" span={16}>
                        <Content style={{ padding: '20px' }}>
                            <Title style={{ textAlign: 'center' }} level={2}>My Post </Title>
                            <List
                                grid={{ gutter: 16, column: 3 }}
                                dataSource={account?.contents}
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
};


export default ProfilePage