import { Card, List, Button, Typography } from "antd"
import { FileTextOutlined } from "@ant-design/icons"
import { useTranslation } from "react-i18next"
import { Link } from "react-router"
import { mockPosts } from "/mock-data/mock-posts.js"

const { Title, Text } = Typography
const PAGE_SIZE = 5

const RecentPosts = ({ posts = mockPosts.data }) => {
  const { t } = useTranslation()
  const currentTime = new Date()

  // Sắp xếp bài đăng theo created_at giảm dần, lấy tối đa 5 bài
  const recentPosts = posts
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, PAGE_SIZE)

  const getTimeDisplay = (createdAt) => {
    const postTime = new Date(createdAt)
    const diffMs = currentTime - postTime
    const diffMinutes = Math.floor(diffMs / (1000 * 60))
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffMinutes < 60) {
      return t('dashboard_page.minutes_ago', { minutes: diffMinutes })
    } else if (diffHours < 24) {
      return t('dashboard_page.hours_ago', { hours: diffHours })
    } else if (diffDays < 2) {
      return t('dashboard_page.yesterday')
    } else {
      return postTime.toLocaleDateString()
    }
  }

  return (
    <Card>
      <Title level={2} className="mb-4">{t('dashboard_page.recent_posts')}</Title>
      <List
        dataSource={recentPosts}
        renderItem={(post) => (
          <List.Item>
            <List.Item.Meta
              avatar={<FileTextOutlined className={'text-primary'} />}
              title={<Link to={`/posts/${post.id}`}>{post.title}</Link>}
              description={
                <Text type={'secondary'}>
                  {t('dashboard_page.posted_on')}: {getTimeDisplay(post.created_at)}
                </Text>
              }
            />
          </List.Item>
        )}
      />
      <div className="text-center mt-4">
        <Link to="/posts">
          <Button className="btn" type="primary">{t('actions.load_more')}</Button>
        </Link>
      </div>
    </Card>
  )
}

export default RecentPosts
