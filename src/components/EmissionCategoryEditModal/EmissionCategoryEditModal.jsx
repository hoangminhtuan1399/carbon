import { Modal, Row, Col, Typography, Input, InputNumber } from "antd"
import { useTranslation } from "react-i18next"

const { Text } = Typography
const { TextArea } = Input

const EmissionFactorEditModal = ({ visible, onOk, onCancel, selectedCategory, editValues, setEditValues }) => {
  const { t } = useTranslation()

  const indicators = [
    { key: 'co2', label: t('projects_page.co2'), step: 0.01 },
    { key: 'ch4', label: t('projects_page.ch4'), step: 0.0001 },
    { key: 'n2o', label: t('projects_page.n2o'), step: 0.00001 },
    { key: 'hfc', label: t('projects_page.hfc'), step: 0.0001 },
    { key: 'pfc', label: t('projects_page.pfc'), step: 0.0001 },
    { key: 'sf6', label: t('projects_page.sf6'), step: 0.00001 },
    { key: 'nf3', label: t('projects_page.nf3'), step: 0.00001 },
    { key: 'bo', label: t('projects_page.bo'), step: 0.01 },
    { key: 'nvc', label: t('projects_page.nvc'), step: 0.01 },
    { key: 'mcf', label: t('projects_page.mcf'), step: 0.01 },
    { key: 'ef_effluent', label: t('projects_page.ef_effluent'), step: 0.0001 },
    { key: 'nrem', label: t('projects_page.nrem'), step: 0.01 },
    { key: 'ef_n2o_plant', label: t('projects_page.ef_n2o_plant'), step: 0.00001 },
  ]

  return (
    <Modal
      title={t('projects_page.edit_emission_factor')}
      open={visible}
      onOk={onOk}
      onCancel={onCancel}
      okButtonProps={{ disabled: !editValues.reason_vi.trim() }}
      width={800}
    >
      <Row gutter={[16, 16]}>
        {indicators.map(indicator => (
          selectedCategory?.[indicator.key] != null && (
            <Col span={6} key={indicator.key}>
              <Text strong>{indicator.label}</Text>
              <InputNumber
                value={editValues[indicator.key]}
                onChange={value => setEditValues({ ...editValues, [indicator.key]: value })}
                className="w-full"
                min={0}
                controls={false}
              />
              <Text type="secondary" className="mt-2 block">
                {selectedCategory?.[`${indicator.key}_lower`] == null ? '-' : selectedCategory[`${indicator.key}_lower`]} -
                {selectedCategory?.[`${indicator.key}_upper`] == null ? '-' : selectedCategory[`${indicator.key}_upper`]}
              </Text>
            </Col>
          )
        ))}
        <Col span={24}>
          <Text strong>{t('projects_page.enter_reason')}</Text>
          <TextArea
            value={editValues.reason_vi}
            onChange={e => setEditValues({ ...editValues, reason_vi: e.target.value })}
            rows={4}
          />
        </Col>
      </Row>
    </Modal>
  )
}

export default EmissionFactorEditModal
