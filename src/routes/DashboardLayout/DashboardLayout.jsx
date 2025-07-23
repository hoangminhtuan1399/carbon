import { checkAccessToken } from "../../utils/access-token.js"
import { Navigate, Outlet, useNavigate } from "react-router"
import { App, Avatar, Button, Layout, Menu, Space, Typography } from "antd"
import {
  BarChartOutlined,
  FileTextOutlined,
  HomeOutlined,
  IdcardOutlined,
  LeftOutlined,
  LogoutOutlined,
  ProjectOutlined,
  RightOutlined,
  UserOutlined
} from "@ant-design/icons"
import { useTranslation } from "react-i18next"
import { useCallback, useEffect, useMemo, useState } from "react"
import { useLogout } from "../../hooks/useLogout.js"
import { useUserContext } from "../../context/UserContext.jsx"

const { Header, Sider, Content } = Layout

const { Title } = Typography

export const DashboardLayout = () => {
  const navigate = useNavigate()
  const { modal, message } = App.useApp()
  const { t } = useTranslation()
  const [collapsed, setCollapsed] = useState(false)
  const [selectedKey, setSelectedKey] = useState('dashboard')
  const { logout } = useLogout()
  const { userProfile } = useUserContext()

  const menuItems = useMemo(() => {
    return [
      { key: 'dashboard', label: t('menu.dashboard'), url: '/', icon: <HomeOutlined/> },
      { key: 'projects', label: t('menu.projects'), url: '/projects', icon: <ProjectOutlined/> },
      { key: 'posts', label: t('menu.posts'), url: '/posts', icon: <FileTextOutlined/> },
      { key: 'reports', label: t('menu.reports'), url: '/reports', icon: <BarChartOutlined/> },
      { key: 'profile', label: t('menu.profile'), url: '/profile', icon: <IdcardOutlined/> },
      { key: 'logout', label: t('actions.logout'), url: '/logout', icon: <LogoutOutlined/> }
    ]
  }, [t])

  const updateSelectedKey = useCallback(() => {
    const path = window.location.pathname
    if (path === '/') return setSelectedKey('dashboard')

    const activeItem = menuItems.find(item => path.includes(item.key))
    if (!activeItem) return setSelectedKey('dashboard')

    return setSelectedKey(activeItem.key)
  }, [menuItems])

  const toggleCollapsed = useCallback(() => {
    setCollapsed(!collapsed)
  }, [collapsed])

  const openLogoutModal = useCallback(() => {
    modal.confirm({
      centered: true,
      title: t('actions.logout'),
      content: t('general.logout_confirm'),
      okText: t('actions.logout'),
      okType: 'danger',
      maskClosable: true,
      cancelText: t('actions.cancel'),
      onOk() {
        message.success(t('general.logout_success'))
        logout()
      }
    })
  }, [modal, t, logout])

  useEffect(() => {
    updateSelectedKey()
  }, [window.location.pathname])

  const token = checkAccessToken()
  if (!token) return <Navigate to={'/auth'} replace/>

  return (
    <Layout>
      <Header className={'flex px-3 py-2 bg-primary'}>
        <div className={'flex items-center gap-4 h-full px-5'}>
          <img
            className={'w-8 h-auto shrink-0 object-cover transition-all'}
            src={'/src/assets/images/isats-logo.png'}
            alt={'logo'}
          />
          <Title className={'mb-0'} level={3}>ISATS</Title>
        </div>
        <Space size={12} align={'center'} className={'ml-auto px-3 py-2'}>
          <Avatar icon={<UserOutlined/>}/>
          <p className={'mb-0'}>{userProfile?.full_name}</p>
        </Space>
      </Header>
      <Layout className={'h-[calc(100vh-64px)]'}>
        <Sider
          className={'sticky top-16 p-2 overflow-visible border-r-1 border-r-border-light bg-white'}
          width={256}
          collapsible={true}
          trigger={null}
          collapsed={collapsed}
        >
          <Button
            className={'absolute top-12 -right-3 opacity-50 hover:opacity-100 transition-all'}
            onClick={toggleCollapsed}
            size={'small'}
            shape={'circle'}
            icon={collapsed ? <RightOutlined/> : <LeftOutlined/>}
          />
          <Menu
            className={'bg-transparent border-none'}
            mode={'inline'}
            selectedKeys={[selectedKey]}
            items={menuItems}
            onClick={({ key }) => {
              if (key === 'logout') {
                openLogoutModal()
                return
              }
              const item = menuItems.find((item) => item.key === key)
              if (item?.url) navigate(item.url)
            }}
          />
        </Sider>
        <Content className={'h-full p-5 bg-transparent overflow-y-auto'}>
          <Outlet/>
        </Content>
      </Layout>
    </Layout>
  )
}
