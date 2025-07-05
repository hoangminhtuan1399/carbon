import { Breadcrumb, Card, Descriptions } from "antd"
import { HomeOutlined } from "@ant-design/icons"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router"
import { useEffect, useMemo, useState } from "react"
import i18n from "i18next"
import { DEFINED_LANGUAGES } from "../../constants/languages.js"
import UsersApi from "../../../api/users/UsersApi.js"
import { useResponseAction } from "../../hooks/useResponseAction.js"

export const UsersPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [users, setUsers] = useState([])
  const { performAction } = useResponseAction()

  const userCards = useMemo(() => {
    return users.map((user) => {
      return (
        <Descriptions
          className={'mb-4'}
          key={user.national_id}
          title={t('menu.users')}
          items={[
            {
              key: 1,
              label: t('users_page.national_id'),
              children: user.national_id
            },
            {
              key: 2,
              label: t('users_page.full_name'),
              children: user.full_name
            },
            {
              key: 3,
              label: t('users_page.email'),
              children: user.email
            },
            {
              key: 4,
              label: t('users_page.date_of_birth'),
              children: user.date_of_birth
            },
            {
              key: 5,
              label: t('users_page.department'),
              children: user.department
            }
          ]}
        />
      )
    })
  }, [users])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true)
        const language = i18n.language || DEFINED_LANGUAGES.VN
        const response = await UsersApi.getUsers({ language })
        setUsers(response.data)
      } catch (e) {
        const { message, action } = e.meta
        performAction(action, message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUsers()
  }, [])

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
      <Card className={'mt-6'}>
        {isLoading ? 'Loading' : userCards}
      </Card>
    </div>
  )
}
