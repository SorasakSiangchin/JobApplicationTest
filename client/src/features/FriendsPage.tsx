
import React, { useEffect } from 'react'
import Header from '../app/layout/Header';
import { Content } from 'antd/es/layout/layout';
import { Avatar, Button, Card, Col, Empty, Input, List, Row, Space, Typography } from 'antd';
import Meta from 'antd/es/card/Meta';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/stores/configureStore';
import { getFriends, searchName } from '../app/stores/accountSlice';
import ButtonFollow from '../app/components/ButtonFollow';
import { SearchProps } from 'antd/es/input';
import { ReloadOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Search } = Input;



const FriendsPage = () => {

  const dispatch = useAppDispatch();
  const { friends, account, friendsLoaded } = useAppSelector(state => state.account);

  useEffect(() => {
    if (!friendsLoaded) dispatch(getFriends());
  }, [friendsLoaded, dispatch]);

  const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
    dispatch(searchName(value));
  };

  return (
    <>
      <Header />
      <Content style={{ padding: '20px' }}>
        <Row>
          <Col span={8}></Col>
          <Col span={8}>
            <Title style={{ textAlign: 'center' }} level={2}>Friends</Title>
          </Col>
          <Col span={8} style={{ display: 'flex', alignContent: "end", justifyContent: 'end' }}>
            <Space>
              <Search
                placeholder="input search name"
                onSearch={onSearch}
                enterButton />
              <Button type="primary" onClick={() => dispatch(getFriends())} icon={<ReloadOutlined />} />
            </Space>
          </Col>
        </Row>

        <List
          grid={{ gutter: 16, column: 4 }}
          dataSource={friends ? friends : []}
          locale={{ emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="There are no posts Please add friends." /> }}
          renderItem={(friend) => {
            return <List.Item >
              <Card
                hoverable
                style={{ width: "100%" }}
                actions={[
                  account && <ButtonFollow type='primary' accountId={account.id} friendId={friend.id} />
                ]}
              >
                <Link to={`/profileFriend/${friend.id}`} >
                  <Meta
                    avatar={<Avatar src={friend.profileImageUrl} />}
                    title={friend.firstName + " " + friend.lastName}
                    description={`There are ${friend.contents.length > 0 ? friend.contents.length : 'no'} posts.`}
                  />
                </Link>
              </Card>
            </List.Item>
          }}
        />
      </Content>
    </>
  )
}

export default FriendsPage