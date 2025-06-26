import { checkAccessToken } from "../../utils/access-token.js";
import { Navigate, Outlet, useNavigate } from "react-router";
import { Layout, Menu, Typography } from "antd";

const { Sider, Content } = Layout

const menuItems = [
  { key: 'index', label: 'Dashboard', url: '/' },
  { key: 'projects', label: 'Projects', url: '/projects' },
  { key: 'users', label: 'Users', url: '/users' },
  { key: 'profile', label: 'Profile', url: '/profile' },
]

const { Title, Paragraph, Text } = Typography;

export const DashboardLayout = () => {
  const navigate = useNavigate();
  const token = checkAccessToken();
  if (!token) return <Navigate to={'/auth'} replace />

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        className={'h-screen sticky top-0 p-2 overflow-y-auto border-r-1 border-r-border-light bg-transparent'}
        width={256}
        collapsible={true}
        trigger={null}
      >
        <div className={'flex items-center gap-4 px-5 py-2 border-b-border-light border-b-1 mb-3'}>
          <img className={'w-8 h-auto object-cover'} src={'/src/assets/images/isats-logo.png'} alt={'logo'}/>
          <Title level={3}>ISATS</Title>
        </div>
        <Menu
          className={'bg-transparent border-none'}
          mode={'inline'}
          defaultSelectedKeys={['index']}
          items={menuItems}
          onClick={({ key }) => {
            const item = menuItems.find((item) => item.key === key);
            if (item?.url) navigate(item.url);
          }}
        />
      </Sider>
      <Content className={'p-5 bg-transparent'}>
        <Outlet/>
      </Content>
    </Layout>
  );
}
