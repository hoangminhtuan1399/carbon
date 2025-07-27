import { Card, Input, Table, Typography } from "antd"
import { useTranslation } from "react-i18next"
import { useState } from "react"

const { Text } = Typography

const UserList = ({ users }) => {
  const { t } = useTranslation()
  const [searchText, setSearchText] = useState('')

  const filteredUsers = users
    .filter(user => user.level <= 60)
    .filter(user =>
      searchText.length === 0 ||
      user.email.toLowerCase().includes(searchText.toLowerCase()) ||
      user.full_name.toLowerCase().includes(searchText.toLowerCase()) ||
      user.email.toLowerCase().includes(searchText.toLowerCase())
    )

  const columns = [
    {
      title: t('users_page.full_name'),
      dataIndex: 'full_name',
      key: 'full_name',
    },
    {
      title: t('users_page.email'),
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: t('users_page.phone'),
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: t('users_page.level'),
      dataIndex: 'level',
      key: 'level',
      render: level => {
        const levels = {
          60: t('users_page.project_manager'),
          50: t('users_page.leader'),
          40: t('users_page.staff'),
        }
        return levels[level] || '-'
      },
    },
  ]

  return (
    <div>
      <Input
        placeholder={t('users_page.search_by')}
        value={searchText}
        onChange={e => setSearchText(e.target.value)}
        className="w-1/4 mb-4"
      />
      <Table
        dataSource={filteredUsers}
        columns={columns}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '50'],
        }}
        rowKey="id"
      />
    </div>
  )
}

export default UserList
