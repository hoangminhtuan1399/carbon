import { Card, Col, DatePicker, Empty, Row, Select, Typography } from "antd"
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons"
import { useTranslation } from "react-i18next"
import { useState } from "react"
import { Column as AntdColumn } from '@ant-design/plots'

const { Title, Paragraph } = Typography
const { Option } = Select
const { RangePicker } = DatePicker

const PostStatistics = ({ posts, projects }) => {
  const { t } = useTranslation()
  const [chartPeriod, setChartPeriod] = useState('month')
  const [postDateRange, setPostDateRange] = useState(null)
  const [selectedProjects, setSelectedProjects] = useState([])

  const getWeekRange = (date) => {
    const startOfWeek = new Date(date)
    startOfWeek.setDate(date.getDate() - date.getDay())
    const endOfWeek = new Date(startOfWeek)
    endOfWeek.setDate(startOfWeek.getDate() + 6)
    return {
      key: `${startOfWeek.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit'
      })} - ${endOfWeek.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' })}`,
      start: startOfWeek.getTime(),
    }
  }

  const getChartData = () => {
    const periodMap = {
      day: 'YYYY-MM-DD',
      week: 'week',
      month: 'YYYY-MM',
      quarter: 'YYYY-Q',
      year: 'YYYY'
    }
    const format = periodMap[chartPeriod]

    const postCounts = posts
      .filter(post =>
        (selectedProjects.length === 0 || selectedProjects.includes(post.project_id)) &&
        (!postDateRange || (
          (!postDateRange[0] || new Date(post.created_at) >= postDateRange[0]) &&
          (!postDateRange[1] || new Date(post.created_at) <= postDateRange[1])
        ))
      )
      .reduce((acc, post) => {
        const date = new Date(post.created_at)
        let key, timestamp
        if (chartPeriod === 'week') {
          const { key: weekKey, start } = getWeekRange(date)
          key = weekKey
          timestamp = start
        } else if (chartPeriod === 'quarter') {
          const quarter = Math.floor((date.getMonth() + 3) / 3)
          key = `${date.getFullYear()}-Q${quarter}`
          timestamp = new Date(date.getFullYear(), (quarter - 1) * 3, 1).getTime()
        } else {
          key = date.toISOString().slice(0, format.length)
          timestamp = date.getTime()
        }
        acc[key] = { count: (acc[key]?.count || 0) + 1, timestamp }
        return acc
      }, {})

    return Object.entries(postCounts)
      .map(([key, { count, timestamp }]) => ({ time: key, count, timestamp }))
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, 50)
      .sort((a, b) => a.time.localeCompare(b.time))
  }

  const chartConfig = {
    data: getChartData(),
    xField: 'time',
    yField: 'count',
    xAxis: {
      label: {
        autoRotate: true,
        style: { fontSize: 10 }
      }
    },
    yAxis: { title: { text: t('dashboard_page.post_count') } },
    title: { text: t('dashboard_page.posts_by_period') }
  }

  const today = new Date()
  const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000)
  const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()))
  const startOfLastWeek = new Date(startOfWeek.getTime() - 7 * 24 * 60 * 60 * 1000)
  const endOfLastWeek = new Date(startOfWeek.getTime() - 1)
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
  const startOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1)
  const endOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0)

  const todayPosts = posts.filter(post => {
    const postDate = new Date(post.created_at)
    return postDate.toDateString() === today.toDateString()
  }).length

  const thisWeekPosts = posts.filter(post => {
    const postDate = new Date(post.created_at)
    return postDate >= startOfWeek
  }).length

  const thisMonthPosts = posts.filter(post => {
    const postDate = new Date(post.created_at)
    return postDate >= startOfMonth
  }).length

  const yesterdayPosts = posts.filter(post => {
    const postDate = new Date(post.created_at)
    return postDate.toDateString() === yesterday.toDateString()
  }).length

  const lastWeekPosts = posts.filter(post => {
    const postDate = new Date(post.created_at)
    return postDate >= startOfLastWeek && postDate <= endOfLastWeek
  }).length

  const lastMonthPosts = posts.filter(post => {
    const postDate = new Date(post.created_at)
    return postDate >= startOfLastMonth && postDate <= endOfLastMonth
  }).length

  const getTrend = (current, previous) => {
    if (current > previous) {
      return { color: 'text-green-500', icon: <ArrowUpOutlined/> }
    } else if (current < previous) {
      return { color: 'text-red-500', icon: <ArrowDownOutlined/> }
    }
    return { color: '', icon: null }
  }

  const todayTrend = getTrend(todayPosts, yesterdayPosts)
  const weekTrend = getTrend(thisWeekPosts, lastWeekPosts)
  const monthTrend = getTrend(thisMonthPosts, lastMonthPosts)

  return (
    <Card>
      <Title level={2} className="mb-4">{t('dashboard_page.post_statistics')}</Title>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Card>
            <Title level={3} className={todayTrend.color}>
              {todayPosts} {todayTrend.icon}
            </Title>
            <Paragraph>{t('dashboard_page.today_posts')}</Paragraph>
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Title level={3} className={weekTrend.color}>
              {thisWeekPosts} {weekTrend.icon}
            </Title>
            <Paragraph>{t('dashboard_page.this_week_posts')}</Paragraph>
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Title level={3} className={monthTrend.color}>
              {thisMonthPosts} {monthTrend.icon}
            </Title>
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
          <Row gutter={[16, 16]} className="mb-4">
            {projects.length > 1 && (
              <Col span={6}>
                <Select
                  mode="multiple"
                  placeholder={t('projects_page.filter_by_project')}
                  value={selectedProjects}
                  onChange={setSelectedProjects}
                  className="w-full"
                  allowClear
                >
                  {projects.map(project => (
                    <Option key={project.id} value={project.id}>{project.name}</Option>
                  ))}
                </Select>
              </Col>
            )}
            <Col span={6}>
              <RangePicker
                placeholder={[t('dashboard_page.start_date'), t('dashboard_page.end_date')]}
                value={postDateRange}
                onChange={setPostDateRange}
                className="w-full"
              />
            </Col>
            <Col span={6}>
              <Select
                value={chartPeriod}
                onChange={setChartPeriod}
                className="w-full"
              >
                <Option value="day">{t('dashboard_page.day')}</Option>
                <Option value="week">{t('dashboard_page.week')}</Option>
                <Option value="month">{t('dashboard_page.month')}</Option>
                <Option value="quarter">{t('dashboard_page.quarter')}</Option>
                <Option value="year">{t('dashboard_page.year')}</Option>
              </Select>
            </Col>
          </Row>
          {chartConfig.data.length === 0 ? (
            <Empty description={t('dashboard_page.no_posts_found')} className="my-8"/>
          ) : (
            <AntdColumn {...chartConfig} />
          )}
        </Col>
      </Row>
    </Card>
  )
}

export default PostStatistics
