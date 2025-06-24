import { checkAccessToken } from "../../utils/check-access-token.js";
import { Navigate, Outlet, useNavigate } from "react-router";
import { Layout, Menu } from "antd";

const { Sider, Content } = Layout

const menuItems = [
  { key: 'index', label: 'Dashboard', url: '/' },
  { key: 'profile', label: 'Profile', url: '/profile' },
]

export const DashboardLayout = () => {
  const navigate = useNavigate();
  const token = checkAccessToken();
  if (!token) return <Navigate to={'/auth'} replace />

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider className={'h-screen sticky top-0 overflow-y-auto bg-background'}>
        <Menu
          className={'bg-transparent!'}
          mode={'inline'}
          defaultSelectedKeys={['index']}
          items={menuItems}
          onClick={({ key }) => {
            const item = menuItems.find((item) => item.key === key);
            if (item?.url) navigate(item.url);
          }}
        />
      </Sider>
      <Content className={'p-5'}>
        <Outlet/>
      </Content>
    </Layout>
  );
}
