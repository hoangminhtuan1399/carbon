import { Breadcrumb } from "antd"
import { HomeOutlined } from "@ant-design/icons"
import { useTranslation } from "react-i18next"

export const DashboardPage = () => {
  const {t} = useTranslation()
  return (
    <div>
      <Breadcrumb
        items={[
          {
            title: <>
              <HomeOutlined/>
              <span>{t('menu.dashboard')}</span>
            </>
          }
        ]}
      />
    </div>
  )
}
