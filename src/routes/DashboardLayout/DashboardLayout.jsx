import { checkAccessToken } from "../../utils/access-token.js"
import { Navigate, Outlet, useNavigate } from "react-router"
import { App, Button, Layout, Menu, Typography } from "antd"
import {
  HomeOutlined,
  IdcardOutlined,
  LeftOutlined,
  LogoutOutlined,
  ProjectOutlined,
  RightOutlined,
  UserOutlined
} from "@ant-design/icons"
import { useTranslation } from "react-i18next"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useLogout } from "../../hooks/useLogout.js"

const { Sider, Content } = Layout

const { Title, Paragraph, Text } = Typography

export const DashboardLayout = () => {
  const navigate = useNavigate()
  const { modal, message } = App.useApp()
  const { t } = useTranslation()
  const siteNameRef = useRef(null)
  const [collapsed, setCollapsed] = useState(false)
  const [selectedKey, setSelectedKey] = useState('index')
  const { logout } = useLogout()

  const menuItems = useMemo(() => {
    return [
      { key: 'index', label: t('menu.dashboard'), url: '/', icon: <HomeOutlined/> },
      { key: 'projects', label: t('menu.projects'), url: '/projects', icon: <ProjectOutlined/> },
      { key: 'users', label: t('menu.users'), url: '/users', icon: <UserOutlined/> },
      { key: 'profile', label: t('menu.profile'), url: '/profile', icon: <IdcardOutlined/> },
      { key: 'logout', label: t('actions.logout'), url: '/logout', icon: <LogoutOutlined/> }
    ]
  }, [])

  const updateSelectedKey = useCallback(() => {
    const path = window.location.pathname
    if (path === '/') return setSelectedKey('index')

    const activeItem = menuItems.find(item => path.includes(item.key))
    if (!activeItem) return setSelectedKey('index')

    return setSelectedKey(activeItem.key)
  }, [menuItems])

  const toggleCollapsed = useCallback(() => {
    setCollapsed(!collapsed)
    if (!siteNameRef.current) return
    if (!collapsed) {
      siteNameRef.current.classList.add('h-0', 'opacity-0')
      return
    }
    setTimeout(() => {
      siteNameRef.current.classList.remove('h-0', 'opacity-0')
    }, 200)
  }, [collapsed, siteNameRef])

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
  }, [modal])

  useEffect(() => {
    updateSelectedKey()
  }, [window.location.pathname])

  const token = checkAccessToken()
  if (!token) return <Navigate to={'/auth'} replace/>

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        className={'h-screen sticky top-0 p-2 overflow-visible border-r-1 border-r-border-light bg-white'}
        width={256}
        collapsible={true}
        trigger={null}
        collapsed={collapsed}
      >
        <Button className={'absolute top-12 -right-3 opacity-50 hover:opacity-100 transition-all'}
                onClick={toggleCollapsed} size={'small'} shape={'circle'}
                icon={collapsed ? <RightOutlined/> : <LeftOutlined/>}/>
        <div className={'flex items-center gap-4 h-13 px-5 py-2 border-b-border-light border-b-1 mb-3'}>
          <img className={'w-8 h-auto shrink-0 object-cover transition-all'} src={'/src/assets/images/isats-logo.png'}
               alt={'logo'}/>
          <Title ref={siteNameRef} className={`overflow-hidden transition-all`} level={3}>ISATS</Title>
        </div>
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
      <Content className={'p-5 bg-transparent'}>
        <Outlet/>
      </Content>
    </Layout>
  )
}
