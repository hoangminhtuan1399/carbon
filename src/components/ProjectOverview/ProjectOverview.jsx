import { Card, Col, Row, Typography } from "antd"
import { useTranslation } from "react-i18next"

const { Title, Paragraph } = Typography

const ProjectOverview = ({ totalProjects, ongoingProjects, completedProjects }) => {
  const { t } = useTranslation()

  return (
    <Card>
      <Title level={2} className="mb-4">{t('menu.projects')}</Title>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Card>
            <Title level={3}>{totalProjects}</Title>
            <Paragraph>{t('dashboard_page.total_projects')}</Paragraph>
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Title level={3}>{ongoingProjects}</Title>
            <Paragraph>{t('dashboard_page.ongoing_projects')}</Paragraph>
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Title level={3}>{completedProjects}</Title>
            <Paragraph>{t('dashboard_page.completed_projects')}</Paragraph>
          </Card>
        </Col>
      </Row>
    </Card>
  )
}

export default ProjectOverview
