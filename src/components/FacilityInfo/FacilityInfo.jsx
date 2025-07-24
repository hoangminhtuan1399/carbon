import { Typography, Row, Col, Space } from "antd"
import { useTranslation } from "react-i18next"

const { Title, Text } = Typography

const FacilityInfo = ({ facility }) => {
  const { t } = useTranslation()

  return (
    <>
      <Title level={2} className="mb-4">{t('projects_page.facility_detail')}</Title>
      <Space direction="vertical" size="middle" className="w-full">
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Text strong>{t('dashboard_page.facility_name')}: </Text>{facility.name}
          </Col>
          <Col span={12}>
            <Text strong>{t('projects_page.facility_code')}: </Text>{facility.code}
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Text strong>{t('projects_page.address')}: </Text>{facility.address}
          </Col>
          <Col span={12}>
            <Text strong>{t('projects_page.staff_size')}: </Text>{facility.staff_size}
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Text strong>{t('projects_page.contact_email')}: </Text>{facility.contact_email || 'None'}
          </Col>
          <Col span={12}>
            <Text strong>{t('projects_page.contact_phone')}: </Text>{facility.contact_phone || 'None'}
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Text strong>{t('projects_page.description')}: </Text>{facility.description || 'No description'}
          </Col>
        </Row>
      </Space>
    </>
  )
}

export default FacilityInfo
