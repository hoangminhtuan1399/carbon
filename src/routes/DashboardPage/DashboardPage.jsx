import { Breadcrumb, Card, Col, Progress, Row, Select, Typography } from "antd"
import { HomeOutlined } from "@ant-design/icons"
import { useTranslation } from "react-i18next"
import { mockProjects } from "/mock-data/mock-projects.js"
import { mockPosts } from "/mock-data/mock-posts.js"
import { useState } from "react"
import PostList from "../../components/PostList/PostList.jsx"
import { Column as AntdColumn } from '@ant-design/plots'

const { Title, Paragraph } = Typography
const { Option } = Select

export const DashboardPage = () => {
  const { t } = useTranslation()

  // Trạng thái cho biểu đồ
  const [chartPeriod, setChartPeriod] = useState('month')

  // Tính toán tiến độ đánh giá
  const totalPosts = mockPosts.data.length
  const verifiedPosts = mockPosts.data.filter(p => p.status === 3 && p.verified_at !== "").length
  const unverifiedPosts = mockPosts.data.filter(p => p.status !== 3 || p.verified_at === "")
  const completionRate = totalPosts > 0 ? ((verifiedPosts / totalPosts) * 100).toFixed(1) : 0

  // Thống kê bài đăng theo thời gian
  const today = new Date('2025-07-10T06:37:00+07:00') // Ngày hiện tại
  const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000)
  const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()))
  const startOfLastWeek = new Date(startOfWeek.getTime() - 7 * 24 * 60 * 60 * 1000)
  const endOfLastWeek = new Date(startOfWeek.getTime() - 1)
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
  const startOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1)
  const endOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0)

  const todayPosts = mockPosts.data.filter(post => {
    const postDate = new Date(post.created_at)
    return postDate.toDateString() === today.toDateString()
  }).length

  const thisWeekPosts = mockPosts.data.filter(post => {
    const postDate = new Date(post.created_at)
    return postDate >= startOfWeek
  }).length

  const thisMonthPosts = mockPosts.data.filter(post => {
    const postDate = new Date(post.created_at)
    return postDate >= startOfMonth
  }).length

  const yesterdayPosts = mockPosts.data.filter(post => {
    const postDate = new Date(post.created_at)
    return postDate.toDateString() === yesterday.toDateString()
  }).length

  const lastWeekPosts = mockPosts.data.filter(post => {
    const postDate = new Date(post.created_at)
    return postDate >= startOfLastWeek && postDate <= endOfLastWeek
  }).length

  const lastMonthPosts = mockPosts.data.filter(post => {
    const postDate = new Date(post.created_at)
    return postDate >= startOfLastMonth && postDate <= endOfLastMonth
  }).length

  // Dữ liệu cho biểu đồ
  const getChartData = () => {
    const data = []
    const periodMap = {
      day: 'YYYY-MM-DD',
      week: 'YYYY-WW',
      month: 'YYYY-MM',
      quarter: 'YYYY-Q',
      year: 'YYYY'
    }
    const format = periodMap[chartPeriod]

    const postCounts = mockPosts.data.reduce((acc, post) => {
      const date = new Date(post.created_at)
      let key
      if (chartPeriod === 'week') {
        const year = date.getFullYear()
        const week = Math.floor((date.getDate() + (date.getDay() === 0 ? 6 : date.getDay() - 1)) / 7) + 1
        key = `${year}-${week.toString().padStart(2, '0')}`
      } else if (chartPeriod === 'quarter') {
        const quarter = Math.floor((date.getMonth() + 3) / 3)
        key = `${date.getFullYear()}-Q${quarter}`
      } else {
        key = date.toISOString().slice(0, format.length)
      }
      acc[key] = (acc[key] || 0) + 1
      return acc
    }, {})

    Object.keys(postCounts).forEach(key => {
      data.push({ time: key, count: postCounts[key] })
    })

    return data.sort((a, b) => a.time.localeCompare(b.time))
  }

  // Cấu hình biểu đồ
  const chartConfig = {
    data: getChartData(),
    xField: 'time',
    yField: 'count',
    xAxis: { label: { autoRotate: true } },
    yAxis: { title: { text: t('dashboard_page.post_count') } },
    title: { text: t('dashboard_page.posts_by_period') }
  }

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
            )
          }
        ]}
      />
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card>
            <Title level={2} className="mb-4">{t('dashboard_page.post_statistics')}</Title>
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Card>
                  <Title level={3}>{todayPosts}</Title>
                  <Paragraph>{t('dashboard_page.today_posts')}</Paragraph>
                </Card>
              </Col>
              <Col span={8}>
                <Card>
                  <Title level={3}>{thisWeekPosts}</Title>
                  <Paragraph>{t('dashboard_page.this_week_posts')}</Paragraph>
                </Card>
              </Col>
              <Col span={8}>
                <Card>
                  <Title level={3}>{thisMonthPosts}</Title>
                  <Paragraph>{t('dashboard_page.this_month_posts')}</Paragraph>
                </Card>
              </Col>
              <Col span={8}>
                <Card>
                  <Title level={3}>{yesterdayPosts}</Title>
                  <Paragraph>{t('dashboard_page.yesterday_posts')}</Paragraph>
                </Card>
              </Col>
              <Col span={8}>
                <Card>
                  <Title level={3}>{lastWeekPosts}</Title>
                  <Paragraph>{t('dashboard_page.last_week_posts')}</Paragraph>
                </Card>
              </Col>
              <Col span={8}>
                <Card>
                  <Title level={3}>{lastMonthPosts}</Title>
                  <Paragraph>{t('dashboard_page.last_month_posts')}</Paragraph>
                </Card>
              </Col>
              <Col span={24}>
                <Select
                  value={chartPeriod}
                  onChange={setChartPeriod}
                  className="w-32 mb-4"
                >
                  <Option value="day">{t('dashboard_page.day')}</Option>
                  <Option value="week">{t('dashboard_page.week')}</Option>
                  <Option value="month">{t('dashboard_page.month')}</Option>
                  <Option value="quarter">{t('dashboard_page.quarter')}</Option>
                  <Option value="year">{t('dashboard_page.year')}</Option>
                </Select>
                <AntdColumn {...chartConfig} />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={24}>
          <Card>
            <Title level={2} className="mb-4">{t('dashboard_page.evaluation_progress')}</Title>
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Card className="h-full">
                  <Title level={3}>{totalPosts}</Title>
                  <Paragraph>{t('dashboard_page.total_posts')}</Paragraph>
                </Card>
              </Col>
              <Col span={8}>
                <Card className="h-full">
                  <Title level={3}>{unverifiedPosts.length}</Title>
                  <Paragraph>{t('dashboard_page.total_unverified_posts')}</Paragraph>
                </Card>
              </Col>
              <Col span={8}>
                <Card className="h-full">
                  <Title level={3}>{completionRate}%</Title>
                  <Paragraph>{t('dashboard_page.completion_rate')}</Paragraph>
                  <Progress percent={parseFloat(completionRate)}/>
                </Card>
              </Col>
              <Col span={24}>
                <Card>
                  <Title level={3} className="mb-4">{t('dashboard_page.unverified_posts')}</Title>
                  <PostList
                    posts={unverifiedPosts}
                    projects={mockProjects.data}
                    showStatusFilter={false}
                  />
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
