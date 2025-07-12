import { Card, Typography, Row, Col, Space } from "antd"
import { useTranslation } from "react-i18next"

const { Title, Text } = Typography

const ProjectInfo = ({ project, sector }) => {
  const { t } = useTranslation()

  return (
    <Card className="mt-4">
      <Title level={2} className="mb-4">{t('projects_page.project_detail')}</Title>
      <Space direction="vertical" size="middle" className="w-full">
        <Row>
          <Col span={12}>
            <Text strong>{t('projects_page.sector_name')}: </Text>{sector?.name || 'Unknown'}
          </Col>
          <Col span={12}>
            <Text strong>{t('projects_page.state')}: </Text>
            {project.state === 1 ? t('dashboard_page.ongoing_projects') : project.state === 0 ? t('projects_page.inactive') : t('projects_page.deleted')}
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Text strong>{t('projects_page.start_date')}: </Text>{new Date(project.start_date).toLocaleDateString()}
          </Col>
          <Col span={12}>
            <Text strong>{t('projects_page.end_date')}: </Text>{new Date(project.end_date).toLocaleDateString()}
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Text strong>{t('projects_page.description')}: </Text>{project.description}
          </Col>
        </Row>
      </Space>
    </Card>
  )
}

export default ProjectInfo
