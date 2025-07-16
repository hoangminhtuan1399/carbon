import { Card, Typography, Row, Col, Space } from "antd"
import { useTranslation } from "react-i18next"

const { Title, Text } = Typography

const ProjectInfo = ({ project, sector }) => {
  const { t } = useTranslation()

  return (
    <Card className="mt-4">
      <Title level={2} className="mb-4">{t('projects_page.project_detail')}</Title>
      <Space direction="vertical" size="middle" className="w-full">
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Text strong>{t('projects_page.project_name')}: </Text>{project.name}
          </Col>
          <Col span={12}>
            <Text strong>{t('projects_page.project_code')}: </Text>{project.code}
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Text strong>{t('projects_page.sector_name')}: </Text>{sector?.name || 'Unknown'}
          </Col>
          <Col span={12}>
            <Text strong>{t('projects_page.state')}: </Text>
            {project.state === 1 ? t('dashboard_page.ongoing_projects') : project.state === 0 ? t('projects_page.inactive') : t('projects_page.deleted')}
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Text strong>{t('projects_page.start_date')}: </Text>{new Date(project.start_date).toLocaleDateString()}
          </Col>
          <Col span={12}>
            <Text strong>{t('projects_page.end_date')}: </Text>{new Date(project.end_date).toLocaleDateString()}
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Text strong>{t('projects_page.address')}: </Text>{project.address}
          </Col>
          <Col span={12}>
            <Text strong>{t('projects_page.staff_size')}: </Text>{project.staff_size}
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Text strong>{t('projects_page.consultant_firm')}: </Text>{project.consultant_firm || ''}
          </Col>
          <Col span={12}>
            <Text strong>{t('projects_page.contact_email')}: </Text>{project.contact_email}
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Text strong>{t('projects_page.contact_phone')}: </Text>{project.contact_phone}
          </Col>
          <Col span={12}>
            <Text strong>{t('projects_page.base_year')}: </Text>{project.base_year}
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Text strong>{t('projects_page.control_method')}: </Text>
            {project.control_method === 0 ? t('projects_page.operational_control') : t('projects_page.financial_control')}
          </Col>
          <Col span={12}>
            <Text strong>{t('projects_page.assurance_level')}: </Text>
            {project.assurance_level === 1 ? t('projects_page.limited_assurance') : t('projects_page.reasonable_assurance')}
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Text strong>{t('projects_page.materiality_threshold')}: </Text>{project.materiality_threshold}%
          </Col>
          <Col span={12}>
            <Text strong>{t('projects_page.contact_person')}: </Text>
            {Object.keys(project.contact_person).length > 0 ? JSON.stringify(project.contact_person) : ''}
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Text strong>{t('projects_page.description')}: </Text>{project.description}
          </Col>
        </Row>
      </Space>
    </Card>
  )
}

export default ProjectInfo
