import { Table, Button, Empty, Row, Col, Select, DatePicker } from "antd"
import { useTranslation } from "react-i18next"
import { Link } from "react-router"
import { useState } from "react"

const { Option } = Select
const { RangePicker } = DatePicker

const PostList = ({ posts }) => {
  const { t } = useTranslation()

  // Trạng thái cho lọc
  const [statusFilter, setStatusFilter] = useState([])
  const [dateRange, setDateRange] = useState(null)

  // Lọc dữ liệu bài đăng
  const postData = posts
    .map(post => ({
      key: post.id,
      postId: post.id,
      title: post.title,
      emissionDate: new Date(post.emission_date).toLocaleDateString(),
      rawEmissionDate: post.emission_date,
      status: post.status === 3 && post.verified_at ? t('dashboard_page.verified') : t('dashboard_page.unverified'),
      rawStatus: post.status === 3 && post.verified_at ? 'verified' : 'unverified',
    }))
    .filter(post =>
      (statusFilter.length === 0 || statusFilter.includes(post.rawStatus)) &&
      (!dateRange || (
        (!dateRange[0] || new Date(post.rawEmissionDate) >= dateRange[0]) &&
        (!dateRange[1] || new Date(post.rawEmissionDate) <= dateRange[1])
      ))
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
      dataIndex: 'emissionDate',
      key: 'emissionDate',
    },
    {
      title: t('projects_page.status'),
      dataIndex: 'status',
      key: 'status',
    },
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
        <Col span={6}>
          <Select
            mode="multiple"
            placeholder={t('projects_page.filter_by_status')}
            value={statusFilter}
            onChange={setStatusFilter}
            className="w-full"
            allowClear
          >
            <Option value="verified">{t('dashboard_page.verified')}</Option>
            <Option value="unverified">{t('dashboard_page.unverified')}</Option>
          </Select>
        </Col>
        <Col span={6}>
          <RangePicker
            placeholder={[t('dashboard_page.start_date'), t('dashboard_page.end_date')]}
            value={dateRange}
            onChange={setDateRange}
            className="w-full"
          />
        </Col>
      </Row>
      {postData.length === 0 ? (
        <Empty description={t('projects_page.no_posts_found')} className="my-8" />
      ) : (
        <Table
          dataSource={postData}
          columns={columns}
          pagination={false}
          rowKey="postId"
        />
      )}
    </div>
  )
}

export default PostList
