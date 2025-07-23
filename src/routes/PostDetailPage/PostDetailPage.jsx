import { Avatar, Breadcrumb, Card, Empty, Space, Tag, Typography } from "antd"
import { HeartOutlined, HomeOutlined } from "@ant-design/icons"
import { useTranslation } from "react-i18next"
import { useNavigate, useParams } from "react-router"
import { mockPosts } from "/mock-data/mock-posts.js"
import { mockProjects } from "/mock-data/mock-projects.js"
import { mockFacilities } from "/mock-data/mock-facilities.js"

const { Title, Text, Paragraph } = Typography

const PostDetailPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { postId } = useParams()

  // Lấy thông tin bài đăng
  const post = mockPosts.data.find(p => p.id === parseInt(postId))
  const project = mockProjects.data.find(p => p.id === post?.project_id)
  const facility = mockFacilities.data.find(f => f.id === post?.facility_id)

  return (
    <div>
      <Breadcrumb
        items={[
          {
            title: (
              <>
                <HomeOutlined/>
                <span>{t('menu.dashboard')}</span>
              </>
            ),
            onClick: () => navigate('/'),
          },
          {
            title: t('menu.posts'),
            onClick: () => navigate('/posts'),
          },
          {
            title: post?.title || t('posts_page.post_detail'),
          },
        ]}
      />
      {post ? (
        <Card className="mt-4 max-w-2xl mx-auto shadow-md">
          <Space direction="vertical" size="middle" className="w-full">
            {/* Header: Avatar và Username */}
            <div className="flex items-center">
              <Avatar src={post.author.avatar} size={40} className="mr-2"/>
              <Space direction={"vertical"} size={''}>
                <Text strong>{post.author.username}</Text>
                <Text type={'secondary'}>{new Date(post.created_at).toLocaleDateString()}</Text>
              </Space>
            </div>
            {/* Hình ảnh */}
            {post.images && post.images.length > 0 ? (
              <img
                src={post.images[0]}
                alt={post.title}
                className="w-full h-96 object-cover rounded-md"
              />
            ) : (
              <div className="w-full h-96 bg-gray-200 flex items-center justify-center rounded-md">
                <Text>{t('posts_page.no_image')}</Text>
              </div>
            )}
            {/* Nội dung bài đăng */}
            <div>
              <Title level={4}>{post.title}</Title>
              <Paragraph>{post.content || t('posts_page.no_content')}</Paragraph>
              {/* Tags */}
              <div className="mb-2">
                {post.tags && post.tags.length > 0 ? (
                  post.tags.map(tag => (
                    <Tag key={tag} color="blue" className="mr-1 mb-1">
                      #{tag}
                    </Tag>
                  ))
                ) : (
                  <Text>{t('posts_page.no_tags')}</Text>
                )}
              </div>
              {/* Lượt thích */}
              <div className="flex items-center mb-2">
                <HeartOutlined className="mr-1"/>
                <Text>{post.likes.length} {t('posts_page.likes')}</Text>
              </div>
            </div>
            {/* Thông tin bổ sung */}
            <div>
              <Text strong>{t('projects_page.project_name')}: </Text>
              <Text>{project?.name || 'Unknown'}</Text>
            </div>
            <div>
              <Text strong>{t('dashboard_page.facility_name')}: </Text>
              <Text>{facility?.name || 'Unknown'}</Text>
            </div>
          </Space>
        </Card>
      ) : (
        <Card className="mt-4 max-w-2xl mx-auto">
          <Empty description={t('posts_page.no_post_found')} className="my-8"/>
        </Card>
      )}
    </div>
  )
}

export default PostDetailPage
