import { Col, DatePicker, Empty, Flex, Row, Select, Spin, Typography } from "antd"
import { useTranslation } from "react-i18next"
import InfiniteScroll from "react-infinite-scroll-component"
import { mockProjects } from "/mock-data/mock-projects.js"
import { mockFacilities } from "/mock-data/mock-facilities.js"
import PostDetail from "../PostDetail/PostDetail.jsx"
import { useState } from "react"
import { LoadingOutlined } from "@ant-design/icons"

const { Option } = Select
const { RangePicker } = DatePicker
const { Text } = Typography

const PostList = ({ posts, projects = [], showStatusFilter = true }) => {
  const { t } = useTranslation()
  const [statusFilter, setStatusFilter] = useState([])
  const [dateRange, setDateRange] = useState(null)
  const [projectFilter, setProjectFilter] = useState([])
  const [visiblePosts, setVisiblePosts] = useState(12)

  // Lọc dữ liệu bài đăng
  const postData = posts
    .map(post => ({
      key: post.id,
      postId: post.id,
      title: post.title,
      content: post.content,
      emissionDate: new Date(post.emission_date).toLocaleDateString(),
      createdAt: new Date(post.created_at).toLocaleDateString(),
      rawCreatedAt: post.created_at,
      status: post.status === 3 && post.verified_at ? 'verified' : 'unverified',
      statusText: post.status === 3 && post.verified_at ? t('dashboard_page.verified') : t('dashboard_page.unverified'),
      projectId: post.project_id,
      projectName: mockProjects.data.find(p => p.id === post.project_id)?.name || 'Unknown',
      facilityName: mockFacilities.data.find(f => f.id === post.facility_id)?.name || 'Unknown',
      images: post.images,
      tags: post.tags,
      likes: post.likes,
      author: post.author,
    }))
    .filter(post =>
      (!showStatusFilter || statusFilter.length === 0 || statusFilter.includes(post.status)) &&
      (!dateRange || (
        (!dateRange[0] || new Date(post.rawCreatedAt) >= dateRange[0]) &&
        (!dateRange[1] || new Date(post.rawCreatedAt) <= dateRange[1])
      )) &&
      (projectFilter.length === 0 || projectFilter.includes(post.projectId))
    )
  // Tải thêm bài đăng
  const loadMorePosts = () => {
    setVisiblePosts(prev => prev + 12)
  }

  return (
    <div>
      <Row gutter={[16, 16]} className="mb-4">
        {showStatusFilter && (
          <Col span={6}>
            <Select
              mode="multiple"
              placeholder={t('projects_page.filter_by_status')}
              value={statusFilter}
              onChange={setStatusFilter}
              className="w-full"
              allowClear
              suffixIcon={null}
            >
              <Option value="verified">{t('dashboard_page.verified')}</Option>
              <Option value="unverified">{t('dashboard_page.unverified')}</Option>
            </Select>
          </Col>
        )}
        <Col span={6}>
          <RangePicker
            placeholder={[t('dashboard_page.start_date'), t('dashboard_page.end_date')]}
            value={dateRange}
            onChange={setDateRange}
            className="w-full"
          />
        </Col>
        {projects.length > 0 && (
          <Col span={6}>
            <Select
              mode="multiple"
              placeholder={t('projects_page.filter_by_project')}
              value={projectFilter}
              onChange={setProjectFilter}
              className="w-full"
              allowClear
              suffixIcon={null}
            >
              {projects.map(project => (
                <Option key={project.id} value={project.id}>{project.name}</Option>
              ))}
            </Select>
          </Col>
        )}
      </Row>
      {postData.length === 0 ? (
        <Empty description={t('projects_page.no_posts_found')} className="my-8"/>
      ) : (
        <InfiniteScroll
          className={'!overflow-hidden'}
          dataLength={Math.min(visiblePosts, postData.length)}
          next={loadMorePosts}
          hasMore={visiblePosts < postData.length}
          loader={
            <Flex className={'mt-4'} justify={'center'} align="center" gap="middle">
              <Spin indicator={<LoadingOutlined spin/>} size="large"/>
            </Flex>
          }
          endMessage={<Text className="text-center mt-4">{t('posts_page.no_more_posts')}</Text>}
          scrollThreshold={0}
        >
          <Row gutter={[16, 16]}>
            {postData.slice(0, visiblePosts).map(post => (
              <Col
                span={8}
                key={post.postId}
              >
                <PostDetail
                  post={post}
                  projectName={post.projectName}
                  facilityName={post.facilityName}
                  showViewButton={true}
                />
              </Col>
            ))}
          </Row>
        </InfiniteScroll>
      )}
    </div>
  )
}

export default PostList
