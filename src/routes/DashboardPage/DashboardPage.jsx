import { Breadcrumb, Card, Col, DatePicker, Progress, Row, Table, Typography, Tabs, List, Button, Select } from "antd"
import { HomeOutlined, FileTextOutlined, LikeOutlined, CommentOutlined } from "@ant-design/icons"
import { useTranslation } from "react-i18next"
import { Link } from "react-router"
import { mockProjects } from "/mock-data/mock-projects.js"
import { mockFacilities } from "/mock-data/mock-facilities.js"
import { mockPosts } from "/mock-data/mock-posts.js"
import { mockNotifications } from "/mock-data/mock-notifications.js"
import { useState } from "react"

const { Title, Paragraph } = Typography
const { RangePicker } = DatePicker
const { Option } = Select

export const DashboardPage = () => {
  const { t } = useTranslation()

  // Tính toán tổng quan dự án
  const totalProjects = mockProjects.data.length
  const ongoingProjects = mockProjects.data.filter(p => p.state === 1).length
  const completedProjects = mockProjects.data.filter(p => p.state === 2).length

  // Tính toán tiến độ đánh giá
  const totalPosts = mockPosts.data.length
  const verifiedPosts = mockPosts.data.filter(p => p.status === 3 && p.verified_at !== "").length
  const completionRate = totalPosts > 0 ? ((verifiedPosts / totalPosts) * 100).toFixed(1) : 0
  const unverifiedPostsByProject = mockProjects.data
    .map(project => ({
      projectId: project.id,
      projectName: project.name,
      unverifiedCount: mockPosts.data.filter(p => p.project_id === project.id && (p.status !== 3 || p.verified_at === "")).length
    }))
    .filter(project => project.unverifiedCount > 0)
  const unverifiedPostsByFacility = mockFacilities.data
    .map(facility => ({
      facilityId: facility.id,
      facilityName: facility.name,
      unverifiedCount: mockPosts.data.filter(p => p.facility_id === facility.id && (p.status !== 3 || p.verified_at === "")).length
    }))
    .filter(facility => facility.unverifiedCount > 0)

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

  // Sắp xếp notifications theo thời gian giảm dần
  const sortedNotifications = mockNotifications.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))

  // Trạng thái filter
  const [selectedTypes, setSelectedTypes] = useState(['post', 'like', 'comment'])
  const [dateRange, setDateRange] = useState(null)

  // Lọc notifications dựa trên type và date range
  const filteredNotifications = sortedNotifications.filter(notification => {
    if (!selectedTypes.length) return true
    const matchesType = selectedTypes.includes(notification.type)
    if (!matchesType) return false
    if (!dateRange) return true
    const notificationDate = new Date(notification.created_at)
    const [start, end] = dateRange
    return (!start || notificationDate >= start) && (!end || notificationDate <= end)
  })

  // Hàm chọn icon theo loại thông báo
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'post':
        return <FileTextOutlined className={'text-blue'} />
      case 'like':
        return <LikeOutlined className={'text-green'} />
      case 'comment':
        return <CommentOutlined className={'text-orange'} />
      default:
        return null
    }
  }

  // Cấu hình items cho Tabs
  const tabItems = [
    {
      key: 'project',
      label: t('dashboard_page.by_project'),
      children: (
        <Table
          dataSource={unverifiedPostsByProject}
          columns={projectColumns}
          pagination={false}
          rowKey="projectId"
        />
      )
    },
    {
      key: 'facility',
      label: t('dashboard_page.by_facility'),
      children: (
        <Table
          dataSource={unverifiedPostsByFacility}
          columns={facilityColumns}
          pagination={false}
          rowKey="facilityId"
        />
      )
    }
  ]

  return (
    <div>
      <Breadcrumb
        items={[
          {
            title: <>
              <HomeOutlined/>
              <span>{t('menu.dashboard')}</span>
            </>
          }
        ]}
      />
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card>
            <Title level={2}>{t('dashboard_page.recent_activities')}</Title>
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
              <Col span={12}>
                <Select
                  className={'w-full'}
                  mode={'multiple'}
                  placeholder={t('dashboard_page.filter_by_type')}
                  value={selectedTypes}
                  onChange={setSelectedTypes}
                  allowClear
                  suffixIcon={null}
                >
                  <Option value="post">{t('dashboard_page.notification_post')}</Option>
                  <Option value="like">{t('dashboard_page.notification_like')}</Option>
                  <Option value="comment">{t('dashboard_page.notification_comment')}</Option>
                </Select>
              </Col>
              <Col span={12}>
                <RangePicker
                  className={'w-full'}
                  onChange={dates => setDateRange(dates)}
                  value={dateRange}
                  placeholder={[t('dashboard_page.start_date'), t('dashboard_page.end_date')]}
                />
              </Col>
            </Row>
            <List
              dataSource={filteredNotifications.slice(0, 5)} // Hiển thị 5 thông báo mới nhất
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={getNotificationIcon(item.type)}
                    title={<Link to={`/posts/${item.post_id}`}>{item.title}</Link>}
                    description={`${item.content} - ${new Date(item.created_at).toLocaleString()}`}
                  />
                </List.Item>
              )}
            />
            <div style={{ textAlign: 'center', marginTop: '16px' }}>
              <Link to="/notifications">
                <Button className={'btn'} type="primary">{t('actions.load_more')}</Button>
              </Link>
            </div>
          </Card>
        </Col>
        <Col span={24}>
          <Card>
            <Title level={2}>{t('menu.projects')}</Title>
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Card>
                  <Title level={3}>{totalProjects}</Title>
                  <Paragraph>{t('dashboard_page.total_projects')}</Paragraph>
                </Card>
              </Col>
              <Col span={8}>
                <Card>
                  <Title level={3}>{ongoingProjects}</Title>
                  <Paragraph>{t('dashboard_page.ongoing_projects')}</Paragraph>
                </Card>
              </Col>
              <Col span={8}>
                <Card>
                  <Title level={3}>{completedProjects}</Title>
                  <Paragraph>{t('dashboard_page.completed_projects')}</Paragraph>
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={24}>
          <Card>
            <Title level={2}>{t('dashboard_page.evaluation_progress')}</Title>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <Card className={'h-full'}>
                      <Title level={3}>{totalPosts}</Title>
                      <Paragraph>{t('dashboard_page.total_posts')}</Paragraph>
                    </Card>
                  </Col>
                  <Col span={12}>
                    <Card className={'h-full'}>
                      <Title level={3}>{completionRate}%</Title>
                      <Paragraph>{t('dashboard_page.completion_rate')}</Paragraph>
                      <Progress percent={parseFloat(completionRate)} />
                    </Card>
                  </Col>
                </Row>
              </Col>
              <Col span={24}>
                <Card>
                  <Title level={3}>{t('dashboard_page.unverified_posts')}</Title>
                  <Tabs defaultActiveKey="project" items={tabItems} />
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
