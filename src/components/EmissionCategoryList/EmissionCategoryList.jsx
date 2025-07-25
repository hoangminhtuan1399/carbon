import { Table, Button, Empty, Row, Col, Tooltip, Input, Select, Modal, Space, Typography } from "antd"
import { DeleteOutlined, EditOutlined, ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons"
import { useTranslation } from "react-i18next"
import { useState } from "react"
import { FORMULAS } from "../../constants/formulas.js"
import EmissionCategoryEditModal from "../EmissionCategoryEditModal/EmissionCategoryEditModal.jsx"

const { Text } = Typography
const { Option } = Select
const { TextArea } = Input

const EmissionCategoryList = ({ emissionCategories, onUpdate, onDelete }) => {
  const { t, i18n } = useTranslation()
  const [searchText, setSearchText] = useState('')
  const [formulaTypeFilter, setFormulaTypeFilter] = useState([])
  const [editModalVisible, setEditModalVisible] = useState(false)
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [editValues, setEditValues] = useState({
    co2: 0, ch4: 0, n2o: 0, hfc: 0, pfc: 0, sf6: 0, nf3: 0,
    bo: 0, nvc: 0, mcf: 0, ef_effluent: 0, nrem: 0, ef_n2o_plant: 0,
    reason_en: '', reason_vi: ''
  })
  const [deleteReason, setDeleteReason] = useState('')

  // Lọc danh mục phát thải theo tìm kiếm và formulaType
  const emissionCategoryData = emissionCategories
    .map(ec => ({
      key: ec.id,
      name: ec.name,
      viName: ec.vi_name,
      formulaType: ec.formula_type,
      code: ec.code,
      co2: ec.co2,
      co2_upper: ec.co2_upper,
      co2_lower: ec.co2_lower,
      co2_default: ec.co2_lower != null && ec.co2_upper != null ? (ec.co2_lower + ec.co2_upper) / 2 : null,
      ch4: ec.ch4,
      ch4_upper: ec.ch4_upper,
      ch4_lower: ec.ch4_lower,
      ch4_default: ec.ch4_lower != null && ec.ch4_upper != null ? (ec.ch4_lower + ec.ch4_upper) / 2 : null,
      n2o: ec.n2o,
      n2o_upper: ec.n2o_upper,
      n2o_lower: ec.n2o_lower,
      n2o_default: ec.n2o_lower != null && ec.n2o_upper != null ? (ec.n2o_lower + ec.n2o_upper) / 2 : null,
      hfc: ec.hfc,
      hfc_upper: ec.hfc_upper,
      hfc_lower: ec.hfc_lower,
      hfc_default: ec.hfc_lower != null && ec.hfc_upper != null ? (ec.hfc_lower + ec.hfc_upper) / 2 : null,
      pfc: ec.pfc,
      pfc_upper: ec.pfc_upper,
      pfc_lower: ec.pfc_lower,
      pfc_default: ec.pfc_lower != null && ec.pfc_upper != null ? (ec.pfc_lower + ec.pfc_upper) / 2 : null,
      sf6: ec.sf6,
      sf6_upper: ec.sf6_upper,
      sf6_lower: ec.sf6_lower,
      sf6_default: ec.sf6_lower != null && ec.sf6_upper != null ? (ec.sf6_lower + ec.sf6_upper) / 2 : null,
      nf3: ec.nf3,
      nf3_upper: ec.nf3_upper,
      nf3_lower: ec.nf3_lower,
      nf3_default: ec.nf3_lower != null && ec.nf3_upper != null ? (ec.nf3_lower + ec.nf3_upper) / 2 : null,
      bo: ec.bo,
      bo_upper: ec.bo_upper,
      bo_lower: ec.bo_lower,
      bo_default: ec.bo_lower != null && ec.bo_upper != null ? (ec.bo_lower + ec.bo_upper) / 2 : null,
      nvc: ec.nvc,
      nvc_upper: ec.nvc_upper,
      nvc_lower: ec.nvc_lower,
      nvc_default: ec.nvc_lower != null && ec.nvc_upper != null ? (ec.nvc_lower + ec.nvc_upper) / 2 : null,
      mcf: ec.mcf,
      mcf_upper: ec.mcf_upper,
      mcf_lower: ec.mcf_lower,
      mcf_default: ec.mcf_lower != null && ec.mcf_upper != null ? (ec.mcf_lower + ec.mcf_upper) / 2 : null,
      ef_effluent: ec.ef_effluent,
      ef_effluent_upper: ec.ef_effluent_upper,
      ef_effluent_lower: ec.ef_effluent_lower,
      ef_effluent_default: ec.ef_effluent_lower != null && ec.ef_effluent_upper != null ? (ec.ef_effluent_lower + ec.ef_effluent_upper) / 2 : null,
      nrem: ec.nrem,
      nrem_upper: ec.nrem_upper,
      nrem_lower: ec.nrem_lower,
      nrem_default: ec.nrem_lower != null && ec.nrem_upper != null ? (ec.nrem_lower + ec.nrem_upper) / 2 : null,
      ef_n2o_plant: ec.ef_n2o_plant,
      ef_n2o_plant_upper: ec.ef_n2o_plant_upper,
      ef_n2o_plant_lower: ec.ef_n2o_plant_lower,
      ef_n2o_plant_default: ec.ef_n2o_plant_lower != null && ec.ef_n2o_plant_upper != null ? (ec.ef_n2o_plant_lower + ec.ef_n2o_plant_upper) / 2 : null,
    }))
    .filter(ec =>
      (searchText.length === 0 ||
        ec.name.toLowerCase().includes(searchText.toLowerCase()) ||
        ec.viName.toLowerCase().includes(searchText.toLowerCase()) ||
        ec.code.toLowerCase().includes(searchText.toLowerCase())) &&
      (formulaTypeFilter.length === 0 || formulaTypeFilter.includes(ec.formulaType))
    )

  // Hàm render chỉ số với mũi tên
  const renderIndicator = (value, defaultValue) => {
    if (value == null) return '-'
    if (defaultValue == null) return value
    return (
      <Space>
        {value}
        {value > defaultValue ? <ArrowUpOutlined style={{ color: 'green' }} /> : <ArrowDownOutlined style={{ color: 'red' }} />}
      </Space>
    )
  }

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
      title: t('projects_page.formula_type'),
      dataIndex: 'formulaType',
      key: 'formulaType',
      render: (value) => t(FORMULAS[value].title),
    },
    {
      title: t('projects_page.co2'),
      dataIndex: 'co2',
      key: 'co2',
      render: (value, record) => renderIndicator(value, record.co2_default),
    },
    {
      title: t('projects_page.ch4'),
      dataIndex: 'ch4',
      key: 'ch4',
      render: (value, record) => renderIndicator(value, record.ch4_default),
    },
    {
      title: t('projects_page.n2o'),
      dataIndex: 'n2o',
      key: 'n2o',
      render: (value, record) => renderIndicator(value, record.n2o_default),
    },
    {
      title: t('projects_page.hfc'),
      dataIndex: 'hfc',
      key: 'hfc',
      render: (value, record) => renderIndicator(value, record.hfc_default),
    },
    {
      title: t('projects_page.pfc'),
      dataIndex: 'pfc',
      key: 'pfc',
      render: (value, record) => renderIndicator(value, record.pfc_default),
    },
    {
      title: t('projects_page.sf6'),
      dataIndex: 'sf6',
      key: 'sf6',
      render: (value, record) => renderIndicator(value, record.sf6_default),
    },
    {
      title: t('projects_page.nf3'),
      dataIndex: 'nf3',
      key: 'nf3',
      render: (value, record) => renderIndicator(value, record.nf3_default),
    },
    {
      title: t('projects_page.nvc'),
      dataIndex: 'nvc',
      key: 'nvc',
      render: (value, record) => renderIndicator(value, record.nvc_default),
    },
    {
      title: t('actions.title'),
      key: 'action',
      render: (_, record) => (
        <Row justify="end" gutter={[8, 8]}>
          <Col>
            <Tooltip title={t('actions.edit')}>
              <Button
                className="btn"
                type="primary"
                icon={<EditOutlined />}
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
    if (editValues.reason_en.trim() || editValues.reason_vi.trim()) {
      onUpdate({ ...selectedCategory, ...editValues })
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
      onDelete({ ...selectedCategory, reason_en: deleteReason, reason_vi: deleteReason })
      setDeleteModalVisible(false)
      setSelectedCategory(null)
      setDeleteReason('')
    }
  }

  return (
    <>
      <Row gutter={[16, 16]} className="mb-4">
        <Col span={12}>
          <Input
            placeholder={t('projects_page.search_by_code_or_name')}
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            className="w-full"
          />
        </Col>
        <Col span={12}>
          <Select
            mode="multiple"
            placeholder={t('projects_page.filter_by_formula_type')}
            value={formulaTypeFilter}
            onChange={setFormulaTypeFilter}
            className="w-full"
            allowClear
          >
            {Object.keys(FORMULAS).map(key => (
              <Option key={key} value={parseInt(key)}>
                {t(FORMULAS[key].title)}
              </Option>
            ))}
          </Select>
        </Col>
      </Row>
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
      <EmissionCategoryEditModal
        visible={editModalVisible}
        onOk={handleEditOk}
        onCancel={() => setEditModalVisible(false)}
        selectedCategory={selectedCategory}
        editValues={editValues}
        setEditValues={setEditValues}
      />
      <Modal
        title={t('projects_page.confirm_remove_factor')}
        open={deleteModalVisible}
        onOk={handleDeleteOk}
        onCancel={() => setDeleteModalVisible(false)}
        okButtonProps={{ disabled: !deleteReason.trim() }}
      >
        <Text strong>{t('projects_page.enter_reason')}</Text>
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
