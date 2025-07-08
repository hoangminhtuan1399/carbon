import { Breadcrumb, Card, Typography } from "antd"
import { HomeOutlined } from "@ant-design/icons"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router"
import { mockPosts } from "/mock-data/mock-posts.js"
import { mockProjects } from "/mock-data/mock-projects.js"
import PostList from "../../components/PostList/PostList.jsx"

const { Title } = Typography

export const PostsPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  // Lấy tất cả bài đăng
  const postData = mockPosts.data

  return (
    <div>
      <Breadcrumb
        items={[
          {
            href: null,
            title: <HomeOutlined />,
            onClick: () => navigate('/'),
          },
          {
            title: <span>{t('menu.posts')}</span>,
          },
        ]}
      />
      <Card className="mt-4">
        <Title level={2} className="mb-4">{t('projects_page.post_list')}</Title>
        <PostList posts={postData} projects={mockProjects.data} />
      </Card>
    </div>
  )
}
