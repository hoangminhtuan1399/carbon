import { Button, Col, Empty, Input, InputNumber, Modal, Row, Table, Tooltip, Typography } from "antd"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { useTranslation } from "react-i18next"
import { useState } from "react"

const { Text } = Typography
const { TextArea } = Input

const EmissionCategoryList = ({ emissionCategories, onUpdate, onDelete }) => {
  const { t, i18n } = useTranslation()
  const [searchText, setSearchText] = useState('')
  const [editModalVisible, setEditModalVisible] = useState(false)
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [editValues, setEditValues] = useState({
    co2: 0, ch4: 0, n2o: 0, hfc: 0, pfc: 0, sf6: 0, nf3: 0,
    bo: 0, nvc: 0, mcf: 0, ef_effluent: 0, nrem: 0, ef_n2o_plant: 0,
    reason_en: '', reason_vi: ''
  })
  const [deleteReason, setDeleteReason] = useState('')

  // Lọc danh mục phát thải theo tìm kiếm
  const emissionCategoryData = emissionCategories
    .map(ec => ({
      key: ec.id,
      name: ec.name,
      viName: ec.vi_name,
      scope: ec.scope,
      code: ec.code,
      co2: ec.co2,
      co2_upper: ec.co2_upper,
      co2_lower: ec.co2_lower,
      ch4: ec.ch4,
      ch4_upper: ec.ch4_upper,
      ch4_lower: ec.ch4_lower,
      n2o: ec.n2o,
      n2o_upper: ec.n2o_upper,
      n2o_lower: ec.n2o_lower,
      hfc: ec.hfc,
      hfc_upper: ec.hfc_upper,
      hfc_lower: ec.hfc_lower,
      pfc: ec.pfc,
      pfc_upper: ec.pfc_upper,
      pfc_lower: ec.pfc_lower,
      sf6: ec.sf6,
      sf6_upper: ec.sf6_upper,
      sf6_lower: ec.sf6_lower,
      nf3: ec.nf3,
      nf3_upper: ec.nf3_upper,
      nf3_lower: ec.nf3_lower,
      bo: ec.bo,
      bo_upper: ec.bo_upper,
      bo_lower: ec.bo_lower,
      nvc: ec.nvc,
      nvc_upper: ec.nvc_upper,
      nvc_lower: ec.nvc_lower,
      mcf: ec.mcf,
      mcf_upper: ec.mcf_upper,
      mcf_lower: ec.mcf_lower,
      ef_effluent: ec.ef_effluent,
      ef_effluent_upper: ec.ef_effluent_upper,
      ef_effluent_lower: ec.ef_effluent_lower,
      nrem: ec.nrem,
      nrem_upper: ec.nrem_upper,
      nrem_lower: ec.nrem_lower,
      ef_n2o_plant: ec.ef_n2o_plant,
      ef_n2o_plant_upper: ec.ef_n2o_plant_upper,
      ef_n2o_plant_lower: ec.ef_n2o_plant_lower,
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
      title: t('projects_page.co2'),
      dataIndex: 'co2',
      key: 'co2',
      render: (value) => `${value}`,
    },
    {
      title: t('projects_page.ch4'),
      dataIndex: 'ch4',
      key: 'ch4',
      render: (value) => `${value}`,
    },
    {
      title: t('projects_page.n2o'),
      dataIndex: 'n2o',
      key: 'n2o',
      render: (value) => `${value}`,
    },
    {
      title: t('projects_page.hfc'),
      dataIndex: 'hfc',
      key: 'hfc',
      render: (value) => `${value}`,
    },
    {
      title: t('projects_page.pfc'),
      dataIndex: 'pfc',
      key: 'pfc',
      render: (value) => `${value}`,
    },
    {
      title: t('projects_page.sf6'),
      dataIndex: 'sf6',
      key: 'sf6',
      render: (value) => `${value}`,
    },
    {
      title: t('projects_page.nf3'),
      dataIndex: 'nf3',
      key: 'nf3',
      render: (value) => `${value}`,
    },
    {
      title: '',
      key: 'action',
      render: (_, record) => (
        <Row gutter={[8, 8]}>
          <Col>
            <Tooltip title={t('actions.edit')}>
              <Button
                type="primary"
                icon={<EditOutlined/>}
                onClick={() => {
                  setSelectedCategory(record)
                  setEditValues({
                    co2: record.co2,
                    ch4: record.ch4,
                    n2o: record.n2o,
                    hfc: record.hfc,
                    pfc: record.pfc,
                    sf6: record.sf6,
                    nf3: record.nf3,
                    bo: record.bo,
                    nvc: record.nvc,
                    mcf: record.mcf,
                    ef_effluent: record.ef_effluent,
                    nrem: record.nrem,
                    ef_n2o_plant: record.ef_n2o_plant,
                    reason_en: '',
                    reason_vi: ''
                  })
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
                icon={<DeleteOutlined/>}
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
    if (editValues.reason_en.trim() || editValues.reason_vi.trim()) {
      // onUpdate({ ...selectedCategory, ...editValues })
      setEditModalVisible(false)
      setSelectedCategory(null)
      setEditValues({
        co2: 0, ch4: 0, n2o: 0, hfc: 0, pfc: 0, sf6: 0, nf3: 0,
        bo: 0, nvc: 0, mcf: 0, ef_effluent: 0, nrem: 0, ef_n2o_plant: 0,
        reason_en: '', reason_vi: ''
      })
    }
  }

  // Xử lý xóa
  const handleDeleteOk = () => {
    if (deleteReason.trim()) {
      // onDelete({ ...selectedCategory, reason_en: deleteReason, reason_vi: deleteReason })
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
        <Empty description={t('projects_page.no_emission_categories_found')} className="my-8"/>
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
        okButtonProps={{ disabled: !editValues.reason_en.trim() && !editValues.reason_vi.trim() }}
        width={800}
      >
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Typography.Text>{t('projects_page.co2')}</Typography.Text>
            <InputNumber
              value={editValues.co2}
              onChange={value => setEditValues({ ...editValues, co2: value })}
              className="w-full"
              min={0}
              step={0.01}
            />
            <Text
              className="mt-2 block">{selectedCategory?.co2_lower} - {selectedCategory?.co2_upper}</Text>
          </Col>
          <Col span={12}>
            <Typography.Text>{t('projects_page.ch4')}</Typography.Text>
            <InputNumber
              value={editValues.ch4}
              onChange={value => setEditValues({ ...editValues, ch4: value })}
              className="w-full"
              min={0}
              step={0.0001}
            />
            <Text
              className="mt-2 block">{selectedCategory?.ch4_lower} - {selectedCategory?.ch4_upper}</Text>
          </Col>
          <Col span={12}>
            <Typography.Text>{t('projects_page.n2o')}</Typography.Text>
            <InputNumber
              value={editValues.n2o}
              onChange={value => setEditValues({ ...editValues, n2o: value })}
              className="w-full"
              min={0}
              step={0.00001}
            />
            <Text
              className="mt-2 block">{selectedCategory?.n2o_lower} - {selectedCategory?.n2o_upper}</Text>
          </Col>
          <Col span={12}>
            <Typography.Text>{t('projects_page.hfc')}</Typography.Text>
            <InputNumber
              value={editValues.hfc}
              onChange={value => setEditValues({ ...editValues, hfc: value })}
              className="w-full"
              min={0}
              step={0.0001}
            />
            <Text
              className="mt-2 block">{selectedCategory?.hfc_lower} - {selectedCategory?.hfc_upper}</Text>
          </Col>
          <Col span={12}>
            <Typography.Text>{t('projects_page.pfc')}</Typography.Text>
            <InputNumber
              value={editValues.pfc}
              onChange={value => setEditValues({ ...editValues, pfc: value })}
              className="w-full"
              min={0}
              step={0.0001}
            />
            <Text
              className="mt-2 block">{selectedCategory?.pfc_lower} - {selectedCategory?.pfc_upper}</Text>
          </Col>
          <Col span={12}>
            <Typography.Text>{t('projects_page.sf6')}</Typography.Text>
            <InputNumber
              value={editValues.sf6}
              onChange={value => setEditValues({ ...editValues, sf6: value })}
              className="w-full"
              min={0}
              step={0.00001}
            />
            <Text
              className="mt-2 block">{selectedCategory?.sf6_lower} - {selectedCategory?.sf6_upper}</Text>
          </Col>
          <Col span={12}>
            <Typography.Text>{t('projects_page.nf3')}</Typography.Text>
            <InputNumber
              value={editValues.nf3}
              onChange={value => setEditValues({ ...editValues, nf3: value })}
              className="w-full"
              min={0}
              step={0.00001}
            />
            <Text
              className="mt-2 block">{selectedCategory?.nf3_lower} - {selectedCategory?.nf3_upper}</Text>
          </Col>
          <Col span={12}>
            <Typography.Text>{t('projects_page.bo')}</Typography.Text>
            <InputNumber
              value={editValues.bo}
              onChange={value => setEditValues({ ...editValues, bo: value })}
              className="w-full"
              min={0}
              step={0.01}
            />
            <Text
              className="mt-2 block">{selectedCategory?.bo_lower} - {selectedCategory?.bo_upper}</Text>
          </Col>
          <Col span={12}>
            <Typography.Text>{t('projects_page.nvc')}</Typography.Text>
            <InputNumber
              value={editValues.nvc}
              onChange={value => setEditValues({ ...editValues, nvc: value })}
              className="w-full"
              min={0}
              step={0.01}
            />
            <Text
              className="mt-2 block">{selectedCategory?.nvc_lower} - {selectedCategory?.nvc_upper}</Text>
          </Col>
          <Col span={12}>
            <Typography.Text>{t('projects_page.mcf')}</Typography.Text>
            <InputNumber
              value={editValues.mcf}
              onChange={value => setEditValues({ ...editValues, mcf: value })}
              className="w-full"
              min={0}
              step={0.01}
            />
            <Text
              className="mt-2 block">{selectedCategory?.mcf_lower} - {selectedCategory?.mcf_upper}</Text>
          </Col>
          <Col span={12}>
            <Typography.Text>{t('projects_page.ef_effluent')}</Typography.Text>
            <InputNumber
              value={editValues.ef_effluent}
              onChange={value => setEditValues({ ...editValues, ef_effluent: value })}
              className="w-full"
              min={0}
              step={0.0001}
            />
            <Text
              className="mt-2 block">{selectedCategory?.ef_effluent_lower} - {selectedCategory?.ef_effluent_upper}</Text>
          </Col>
          <Col span={12}>
            <Typography.Text>{t('projects_page.nrem')}</Typography.Text>
            <InputNumber
              value={editValues.nrem}
              onChange={value => setEditValues({ ...editValues, nrem: value })}
              className="w-full"
              min={0}
              step={0.01}
            />
            <Text
              className="mt-2 block">{selectedCategory?.nrem_lower} - {selectedCategory?.nrem_upper}</Text>
          </Col>
          <Col span={12}>
            <Typography.Text>{t('projects_page.ef_n2o_plant')}</Typography.Text>
            <InputNumber
              value={editValues.ef_n2o_plant}
              onChange={value => setEditValues({ ...editValues, ef_n2o_plant: value })}
              className="w-full"
              min={0}
              step={0.00001}
            />
            <Text
              className="mt-2 block">{selectedCategory?.ef_n2o_plant_lower} - {selectedCategory?.ef_n2o_plant_upper}</Text>
          </Col>
          <Col span={24}>
            <Typography.Text>{t('projects_page.enter_reason')}</Typography.Text>
            <TextArea
              value={editValues.reason_vi}
              onChange={e => setEditValues({ ...editValues, reason_vi: e.target.value })}
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
