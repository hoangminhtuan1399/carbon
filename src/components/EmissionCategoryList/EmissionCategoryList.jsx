import { Table, Empty, Input, Button, Modal, InputNumber, Typography, Row, Col, Tooltip } from "antd"
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"
import { useTranslation } from "react-i18next"
import { useState } from "react"

const { TextArea } = Input

const EmissionCategoryList = ({ emissionCategories, onUpdate, onDelete }) => {
  const { t, i18n } = useTranslation()
  const [searchText, setSearchText] = useState('')
  const [editModalVisible, setEditModalVisible] = useState(false)
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [editValues, setEditValues] = useState({ co2: 0, ch4: 0, n2o: 0, reason: '' })
  const [deleteReason, setDeleteReason] = useState('')

  // Lọc danh mục phát thải theo tìm kiếm
  const emissionCategoryData = emissionCategories
    .map(ec => ({
      key: ec.id,
      name: ec.name,
      viName: ec.vi_name,
      scope: ec.scope,
      co2: ec.co2,
      ch4: ec.ch4,
      n2o: ec.n2o,
      code: ec.code,
    }))
    .filter(ec =>
      searchText.length === 0 ||
      ec.name.toLowerCase().includes(searchText.toLowerCase()) ||
      ec.viName.toLowerCase().includes(searchText.toLowerCase()) ||
      ec.code.toLowerCase().includes(searchText.toLowerCase())
    )

  // Cột cho bảng danh mục phát thải
  const columns = [
    {
      title: t('projects_page.emission_category_name'),
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => i18n.language === 'en' ? record.name : record.viName,
    },
    {
      title: t('projects_page.emission_factor_code'),
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: t('projects_page.scope'),
      dataIndex: 'scope',
      key: 'scope',
    },
    {
      title: 'CO2 (kg CO2e/unit)',
      dataIndex: 'co2',
      key: 'co2',
    },
    {
      title: 'CH4 (kg CO2e/unit)',
      dataIndex: 'ch4',
      key: 'ch4',
    },
    {
      title: 'N2O (kg CO2e/unit)',
      dataIndex: 'n2o',
      key: 'n2o',
    },
    {
      title: '',
      key: 'action',
      render: (_, record) => (
        <Row gutter={[8, 8]}>
          <Col>
            <Tooltip title={t('actions.edit')}>
              <Button
                className={'btn'}
                type="primary"
                icon={<EditOutlined />}
                onClick={() => {
                  setSelectedCategory(record)
                  setEditValues({ co2: record.co2, ch4: record.ch4, n2o: record.n2o, reason: '' })
                  setEditModalVisible(true)
                }}
              />
            </Tooltip>
          </Col>
          <Col>
            <Tooltip title={t('actions.remove')}>
              <Button
                type="primary"
                danger
                icon={<DeleteOutlined />}
                onClick={() => {
                  setSelectedCategory(record)
                  setDeleteReason('')
                  setDeleteModalVisible(true)
                }}
              />
            </Tooltip>
          </Col>
        </Row>
      ),
    },
  ]

  // Xử lý chỉnh sửa
  const handleEditOk = () => {
    if (editValues.reason.trim()) {
      onUpdate({ ...selectedCategory, ...editValues })
      setEditModalVisible(false)
      setSelectedCategory(null)
      setEditValues({ co2: 0, ch4: 0, n2o: 0, reason: '' })
    }
  }

  // Xử lý xóa
  const handleDeleteOk = () => {
    if (deleteReason.trim()) {
      onDelete({ ...selectedCategory, reason: deleteReason })
      setDeleteModalVisible(false)
      setSelectedCategory(null)
      setDeleteReason('')
    }
  }

  return (
    <>
      <Input
        placeholder={t('projects_page.search_by_code_or_name')}
        value={searchText}
        onChange={e => setSearchText(e.target.value)}
        className="w-full mb-4"
      />
      {emissionCategoryData.length === 0 ? (
        <Empty description={t('projects_page.no_emission_categories_found')} className="my-8" />
      ) : (
        <Table
          dataSource={emissionCategoryData}
          columns={columns}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '50'],
          }}
          rowKey="key"
        />
      )}
      <Modal
        title={t('projects_page.edit_emission_factor')}
        open={editModalVisible}
        onOk={handleEditOk}
        onCancel={() => setEditModalVisible(false)}
        okButtonProps={{ disabled: !editValues.reason.trim() }}
      >
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Typography.Text>{t('projects_page.co2')}</Typography.Text>
            <InputNumber
              value={editValues.co2}
              onChange={value => setEditValues({ ...editValues, co2: value })}
              className="w-full"
              min={0}
              step={0.01}
            />
          </Col>
          <Col span={24}>
            <Typography.Text>{t('projects_page.ch4')}</Typography.Text>
            <InputNumber
              value={editValues.ch4}
              onChange={value => setEditValues({ ...editValues, ch4: value })}
              className="w-full"
              min={0}
              step={0.0001}
            />
          </Col>
          <Col span={24}>
            <Typography.Text>{t('projects_page.n2o')}</Typography.Text>
            <InputNumber
              value={editValues.ch4}
              onChange={value => setEditValues({ ...editValues, n2o: value })}
              className="w-full"
              min={0}
              step={0.00001}
            />
          </Col>
          <Col span={24}>
            <Typography.Text>{t('projects_page.enter_reason')}</Typography.Text>
            <TextArea
              value={editValues.reason}
              onChange={e => setEditValues({ ...editValues, reason: e.target.value })}
              rows={4}
            />
          </Col>
        </Row>
      </Modal>
      <Modal
        title={t('projects_page.confirm_remove_factor')}
        open={deleteModalVisible}
        onOk={handleDeleteOk}
        onCancel={() => setDeleteModalVisible(false)}
        okButtonProps={{ disabled: !deleteReason.trim() }}
      >
        <Typography.Text>{t('projects_page.enter_reason')}</Typography.Text>
        <TextArea
          value={deleteReason}
          onChange={e => setDeleteReason(e.target.value)}
          rows={4}
        />
      </Modal>
    </>
  )
}

export default EmissionCategoryList
