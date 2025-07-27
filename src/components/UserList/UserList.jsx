import { Card, Input, Table, Typography, Button, Tooltip, Modal, Space } from "antd"
import { useTranslation } from "react-i18next"
import { useState } from "react"
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"
import EmissionAssignmentModal from "../EmissionAssignmentModal/EmissionAssignmentModal.jsx"

const { Text } = Typography

const UserList = ({ users }) => {
  const { t } = useTranslation()
  const [searchText, setSearchText] = useState('')
  const [editModalVisible, setEditModalVisible] = useState(false)
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)

  const filteredUsers = users
    .filter(user => user.level <= 60)
    .filter(user =>
      searchText.length === 0 ||
      user.username.toLowerCase().includes(searchText.toLowerCase()) ||
      user.full_name.toLowerCase().includes(searchText.toLowerCase()) ||
      user.email.toLowerCase().includes(searchText.toLowerCase())
    )

  const handleDeleteOk = () => {
    console.log(`Delete user ${selectedUser?.id}`)
    setDeleteModalVisible(false)
    setSelectedUser(null)
  }

  const columns = [
    {
      title: t('users_page.username'),
      dataIndex: 'username',
      key: 'username',
    },
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
    {
      title: t('actions.title'),
      key: 'action',
      minWidth: 120,
      render: (_, record) => (
        <Space>
          {record.level === 40 && (
            <Tooltip title={t('users_page.edit_emission_assignments')}>
              <Button
                className={'btn'}
                type={'primary'}
                icon={<EditOutlined />}
                onClick={() => {
                  setSelectedUser(record)
                  setEditModalVisible(true)
                }}
              />
            </Tooltip>
          )}
          <Tooltip title={t('users_page.delete_user')}>
            <Button
              type={'primary'}
              danger
              icon={<DeleteOutlined />}
              onClick={() => {
                setSelectedUser(record)
                setDeleteModalVisible(true)
              }}
            />
          </Tooltip>
        </Space>
      ),
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
      <EmissionAssignmentModal
        visible={editModalVisible}
        onOk={() => setEditModalVisible(false)}
        onCancel={() => setEditModalVisible(false)}
        user={selectedUser}
      />
      <Modal
        title={t('users_page.confirm_delete_user')}
        open={deleteModalVisible}
        onOk={handleDeleteOk}
        onCancel={() => setDeleteModalVisible(false)}
        okText={t('actions.remove')}
        cancelText={t('actions.cancel')}
      >
        <Text>{t('users_page.delete_confirmation', { name: selectedUser?.full_name })}</Text>
      </Modal>
    </div>
  )
}

export default UserList
