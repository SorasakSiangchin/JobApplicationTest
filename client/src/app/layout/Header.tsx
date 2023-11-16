
import { Layout, Menu, Avatar, Dropdown, MenuProps, Button, Space } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import { UserOutlined} from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../stores/configureStore';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../stores/accountSlice';
import { pathHome } from '../util/util';

const { Header: AntHeader } = Layout;

const paths = [
    { title: 'Feeds', path: '/feed' },
    { title: 'Friends', path: '/friends' },
];



const Header = () => {
    const { account } = useAppSelector(state => state.account);
    const dispatch = useAppDispatch();
    const fullName = account?.firstName + ' ' + account?.lastName;
    const navigate = useNavigate();
    const items: MenuProps['items'] = [
        {
          key: '1',
          label: (
            <Link to="/profile" >
              Profile
            </Link>
          ),
        } ,
        {
            key: '2',
            label: (
              <Link to={pathHome} onClick={() => dispatch(logout())}>
                Logout
              </Link>
            ),
          }     
      ];
    return (
        <AntHeader style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="logo" >Social Media</div>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['0']}>
                {paths.map((path, index) =>
                    <Menu.Item key={index} onClick={() => navigate(path.path)} >
                        {path.title}
                    </Menu.Item>)}
            </Menu>
            <div className="profile">
                <Space >
                    <Avatar icon={<UserOutlined />} src={account?.profileImageUrl} />
                    <p style={{ color: 'white' }}>
                        {fullName}
                    </p>
                    <Dropdown menu={{ items }} placement="bottomLeft" arrow>
                        <Button type='text'>
                            <CaretDownOutlined style={{ color: 'white' }} />
                        </Button>
                    </Dropdown>
                </Space>
            </div>
        </AntHeader>
    )
}

export default Header 