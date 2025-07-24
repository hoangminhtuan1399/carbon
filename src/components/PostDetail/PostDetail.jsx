import { Card, Space, Avatar, Tag, Typography, Button, Badge } from "antd"
import { HeartOutlined } from "@ant-design/icons"
import { useTranslation } from "react-i18next"
import { Link } from "react-router"

const { Title, Text, Paragraph } = Typography

const PostDetail = ({ post, projectName, facilityName, showViewButton = true }) => {
  const { t } = useTranslation()

  return (
    <Card className="shadow-md">
      <Space direction="vertical" size="middle" className="w-full">
        {/* Header: Avatar và Username */}
        <div className="flex items-center">
          <Avatar src={post.author.avatar} size={40} className="mr-2" />
          <Space direction="vertical" size={0}>
            <Text strong>{post.author.username}</Text>
            <Text type="secondary">{new Date(post.createdAt).toLocaleDateString()}</Text>
          </Space>
        </div>
        {/* Hình ảnh */}
        {post.images && post.images.length > 0 ? (
          <div className={'p-3'}>
            <img
              src={'/src/assets/images/isats-logo.png'}
              alt={post.title}
              className="w-full aspect-square object-contain rounded-md"
            />
          </div>
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
            <HeartOutlined className="mr-1" />
            <Text>{post.likes.length} {t('posts_page.likes')}</Text>
          </div>
        </div>
        {/* Thông tin bổ sung */}
        <div>
          <Text strong>{t('projects_page.project_name')}: </Text>
          <Text>{projectName || 'Unknown'}</Text>
        </div>
        <div>
          <Text strong>{t('dashboard_page.facility_name')}: </Text>
          <Text>{facilityName || 'Unknown'}</Text>
        </div>
        {/* Nút View */}
        {showViewButton && (
          <Link to={`/posts/${post.postId}`}>
            <Button className="btn" type="primary">{t('actions.view')}</Button>
          </Link>
        )}
      </Space>
    </Card>
  )
}

export default PostDetail
