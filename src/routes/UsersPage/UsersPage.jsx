import { Breadcrumb } from "antd"
import { HomeOutlined } from "@ant-design/icons"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router"

export const UsersPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
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
    </div>
  )
}
