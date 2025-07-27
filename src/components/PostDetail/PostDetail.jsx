import { Avatar, Button, Card, Col, Input, Row, Space, Tag, Tooltip, Typography } from "antd"
import { HeartFilled, HeartOutlined, MessageOutlined } from "@ant-design/icons"
import { useTranslation } from "react-i18next"
import { Link } from "react-router"
import { useState } from "react"

const { Title, Text, Paragraph } = Typography

const PostDetail = ({ post, projectName, facilityName, showViewButton = true }) => {
  const { t } = useTranslation()
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(post.likes.length)
  const [isCommentInputVisible, setIsCommentInputVisible] = useState(false)
  const [comment, setComment] = useState('')

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1)
  }

  const handleCommentToggle = () => {
    setIsCommentInputVisible(!isCommentInputVisible)
  }

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      console.log('Comment submitted:', comment)
      setComment('')
      setIsCommentInputVisible(false)
    }
  }

  return (
    <Card className="shadow-md">
      <Space direction="vertical" size="middle" className="w-full">
        <div className="flex items-center">
          <Avatar src={post.author.avatar} size={40} className="mr-2"/>
          <Space direction="vertical" size={0}>
            <Text strong>{post.author.username}</Text>
            <Text type="secondary">{new Date(post.createdAt).toLocaleDateString()}</Text>
          </Space>
        </div>
        {post.images && post.images.length > 0 ? (
          <div className="p-3">
            <img
              src="/src/assets/images/isats-logo.png"
              alt={post.title}
              className="w-full aspect-square object-contain rounded-md"
            />
          </div>
        ) : (
          <div className="w-full h-96 bg-gray-200 flex items-center justify-center rounded-md">
            <Text>{t('posts_page.no_image')}</Text>
          </div>
        )}
        <div>
          <Title level={4}>{post.title}</Title>
          <Paragraph>{post.content || t('posts_page.no_content')}</Paragraph>
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
          <div className="flex items-center mb-2">
            <HeartOutlined className="mr-1"/>
            <Text>{likeCount} {t('posts_page.likes')}</Text>
          </div>
        </div>
        <div>
          <Text strong>{t('projects_page.project_name')}: </Text>
          <Text>{projectName || 'Unknown'}</Text>
        </div>
        <div>
          <Text strong>{t('dashboard_page.facility_name')}: </Text>
          <Text>{facilityName || 'Unknown'}</Text>
        </div>
        <Space className="mt-2">
          <Tooltip title={t('posts_page.like')}>
            <Button
              icon={isLiked ? <HeartFilled style={{ color: '#ff4d4f' }}/> : <HeartOutlined/>}
              onClick={handleLike}
            >
            </Button>
          </Tooltip>
          <Tooltip title={t('posts_page.comment')}>
            <Button
              icon={<MessageOutlined/>}
              onClick={handleCommentToggle}
            >
            </Button>
          </Tooltip>
          {showViewButton && (
            <Link to={`/posts/${post.postId}`}>
              <Button className="btn" type="primary">{t('actions.view')}</Button>
            </Link>
          )}
        </Space>
        {isCommentInputVisible && (
          <Row gutter={16}>
            <Col flex={'auto'}>
              <Input
                value={comment}
                onChange={e => setComment(e.target.value)}
                placeholder={t('posts_page.enter_comment')}
                className="w-full"
              />
            </Col>
            <Col>
              <Button
                className={'btn'}
                type="primary"
                onClick={handleCommentSubmit}
                disabled={!comment.trim()}
              >
                {t('posts_page.submit')}
              </Button>
            </Col>
          </Row>
        )}
      </Space>
    </Card>
  )
}

export default PostDetail
