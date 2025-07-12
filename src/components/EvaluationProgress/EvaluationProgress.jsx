import { Card, Col, Row, Progress, Typography, Table } from "antd"
import { useTranslation } from "react-i18next"
import PostList from "../PostList/PostList.jsx"

const { Title, Paragraph } = Typography

const EvaluationProgress = ({ totalPosts, verifiedPosts, unverifiedPosts, unverifiedPostsByProject, unverifiedPostsByFacility }) => {
  const { t } = useTranslation()
  const completionRate = totalPosts > 0 ? ((verifiedPosts / totalPosts) * 100).toFixed(1) : 0

  // Cột cho bảng số bài đăng chưa đánh giá theo dự án
  const projectColumns = [
    {
      title: t('dashboard_page.project_name'),
      dataIndex: 'projectName',
      key: 'projectName'
    },
    {
      title: t('dashboard_page.unverified_posts'),
      dataIndex: 'unverifiedCount',
      key: 'unverifiedCount'
    }
  ]

  // Cột cho bảng số bài đăng chưa đánh giá theo cơ sở
  const facilityColumns = [
    {
      title: t('dashboard_page.facility_name'),
      dataIndex: 'facilityName',
      key: 'facilityName'
    },
    {
      title: t('dashboard_page.unverified_posts'),
      dataIndex: 'unverifiedCount',
      key: 'unverifiedCount'
    }
  ]

  return (
    <Card>
      <Title level={2} className="mb-4">{t('dashboard_page.evaluation_progress')}</Title>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Card className="h-full">
            <Title level={3}>{totalPosts}</Title>
            <Paragraph>{t('dashboard_page.total_posts')}</Paragraph>
          </Card>
        </Col>
        <Col span={8}>
          <Card className="h-full">
            <Title level={3}>{unverifiedPosts.length}</Title>
            <Paragraph>{t('dashboard_page.total_unverified_posts')}</Paragraph>
          </Card>
        </Col>
        <Col span={8}>
          <Card className="h-full">
            <Title level={3}>{completionRate}%</Title>
            <Paragraph>{t('dashboard_page.completion_rate')}</Paragraph>
            <Progress percent={parseFloat(completionRate)} />
          </Card>
        </Col>
        <Col span={24}>
          <Card>
            <Title level={3} className="mb-4">{t('dashboard_page.unverified_posts')}</Title>
            <PostList
              posts={unverifiedPosts}
              showStatusFilter={false}
            />
          </Card>
        </Col>
      </Row>
    </Card>
  )
}

export default EvaluationProgress
