import { Card, Col, Row, Typography, Space } from "antd"
import { useTranslation } from "react-i18next"
import { Link } from "react-router"
import { mockPosts } from "/mock-data/mock-posts.js"

const { Title, Paragraph, Text } = Typography

const EvaluationProgress = ({ totalPosts, unverifiedPosts }) => {
  const { t } = useTranslation()

  const today = new Date()
  const startOfWeek = new Date(today)
  startOfWeek.setDate(today.getDate() - today.getDay())

  const todayUnverifiedPosts = mockPosts.data.filter(post => {
    const postDate = new Date(post.created_at)
    return (
      postDate.toDateString() === today.toDateString() &&
      (post.status !== 1 || post.verified_at === "")
    )
  }).length

  const thisWeekUnverifiedPosts = mockPosts.data.filter(post => {
    const postDate = new Date(post.created_at)
    return (
      postDate >= startOfWeek &&
      (post.status !== 1 || post.verified_at === "")
    )
  }).length

  return (
    <Card>
      <Title level={2} className="mb-4">{t('dashboard_page.evaluation_progress')}</Title>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card className="h-full">
            <Title type={'success'} level={3}>{totalPosts}</Title>
            <Paragraph>{t('dashboard_page.total_posts')}</Paragraph>
          </Card>
        </Col>
        <Col span={12}>
          <Card className="h-full">
            <Title type={'warning'} level={3}>{unverifiedPosts.length}</Title>
            <Paragraph>{t('dashboard_page.total_unverified_posts')}</Paragraph>
            <Space direction="vertical">
              <Link to="/posts">
                <Text className={'underline'} type={'warning'}>{t('dashboard_page.today_unverified_posts')}: {todayUnverifiedPosts}</Text>
              </Link>
              <Link to="/posts">
                <Text className={'underline'} type={'danger'}>{t('dashboard_page.this_week_unverified_posts')}: {thisWeekUnverifiedPosts}</Text>
              </Link>
            </Space>
          </Card>
        </Col>
      </Row>
    </Card>
  )
}

export default EvaluationProgress
