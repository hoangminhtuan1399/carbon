import { Table, Button, Empty, Row, Col, Select, DatePicker } from "antd"
import { useTranslation } from "react-i18next"
import { Link } from "react-router"
import { useState } from "react"

const { Option } = Select
const { RangePicker } = DatePicker

const PostList = ({ posts, projects = [], showStatusFilter = true }) => {
  const { t } = useTranslation()

  // Trạng thái cho lọc và phân trang
  const [statusFilter, setStatusFilter] = useState([])
  const [dateRange, setDateRange] = useState(null)
  const [projectFilter, setProjectFilter] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 5

  // Lọc dữ liệu bài đăng
  const postData = posts
    .map(post => ({
      key: post.id,
      postId: post.id,
      title: post.title,
      emissionDate: new Date(post.emission_date).toLocaleDateString(),
      createdAt: new Date(post.created_at).toLocaleDateString(),
      rawCreatedAt: post.created_at,
      status: post.status === 3 && post.verified_at ? t('dashboard_page.verified') : t('dashboard_page.unverified'),
      rawStatus: post.status === 3 && post.verified_at ? 'verified' : 'unverified',
      projectId: post.project_id,
    }))
    .filter(post =>
      (!showStatusFilter || statusFilter.length === 0 || statusFilter.includes(post.rawStatus)) &&
      (!dateRange || (
        (!dateRange[0] || new Date(post.rawCreatedAt) >= dateRange[0]) &&
        (!dateRange[1] || new Date(post.rawCreatedAt) <= dateRange[1])
      )) &&
      (projectFilter.length === 0 || projectFilter.includes(post.projectId))
    )

  // Cột cho bảng bài đăng
  const columns = [
    {
      title: t('projects_page.post_title'),
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: t('projects_page.post_date'),
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    ...(showStatusFilter ? [{
      title: t('projects_page.status'),
      dataIndex: 'status',
      key: 'status',
    }] : []),
    {
      title: t('actions.view'),
      key: 'action',
      render: (_, record) => (
        <Link to={`/posts/${record.postId}`}>
          <Button className="btn" type="primary">{t('actions.view')}</Button>
        </Link>
      ),
    },
  ]

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
        <Empty description={t('projects_page.no_posts_found')} className="my-8" />
      ) : (
        <Table
          dataSource={postData}
          columns={columns}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: postData.length,
            onChange: page => setCurrentPage(page),
          }}
          rowKey="postId"
        />
      )}
    </div>
  )
}

export default PostList
