import { App, Breadcrumb, Card } from "antd"
import { HomeOutlined } from "@ant-design/icons"
import { useTranslation } from "react-i18next"
import { useLoaderData, useNavigate, useNavigation } from "react-router"
import { useEffect } from "react"
import { ACTIONS } from "../../constants/actions.js"
import { useLogout } from "../../hooks/useLogout.js"

export const UsersPage = () => {
  const { t } = useTranslation()
  const { message } = App.useApp()
  const navigate = useNavigate()
  const navigation = useNavigation()
  const loaderData = useLoaderData()
  const { logout } = useLogout()
  const isLoading = navigation.state === 'loading'
  const isLoadedSuccess = loaderData.success

  useEffect(() => {
    if (!isLoadedSuccess) {
      const { message: errorMessage, action } = loaderData.meta
      switch (action) {
        case ACTIONS.LOGOUT:
          message.error(t('auth.errors.token_expires'))
          logout()
          break
        case ACTIONS.TOAST:
          message.error(errorMessage)
          break
      }
    }
  }, [isLoadedSuccess])

  useEffect(() => {
    console.log(loaderData)
  }, [loaderData])

  return (
    <div>
      <Breadcrumb
        items={[
          {
            href: null,
            title: <>
              <HomeOutlined/>
            </>,
            onClick() {
              navigate('/')
            }
          },
          {
            title: <span>{t('menu.users')}</span>
          }
        ]}
      />
      <Card className={'mt-6'}>Hello users</Card>
    </div>
  )
}
