import { Breadcrumb, Button, Card, Col, DatePicker, Empty, Input, Row, Select, Table, Typography } from "antd"
import { HomeOutlined } from "@ant-design/icons"
import { useTranslation } from "react-i18next"
import { Link, useNavigate } from "react-router"
import { mockProjects } from "/mock-data/mock-projects.js"
import { mockPosts } from "/mock-data/mock-posts.js"
import { mockSectors } from "/mock-data/mock-sectors.js"
import { useState } from "react"

const { Title } = Typography
const { Option } = Select
const { RangePicker } = DatePicker

export const ProjectsPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  // Trạng thái cho tìm kiếm và lọc
  const [searchText, setSearchText] = useState('')
  const [selectedStates, setSelectedStates] = useState([])
  const [selectedSectors, setSelectedSectors] = useState([])
  const [dateRange, setDateRange] = useState(null)

  // Tính số bài đăng và lấy tên sector, lọc dữ liệu
  const projectData = mockProjects.data
    .map(project => ({
      key: project.id,
      projectId: project.id,
      projectName: project.name,
      sectorName: mockSectors.data.find(sector => sector.id === project.sector_id)?.name || 'Unknown',
      state: project.state === 1 ? t('dashboard_page.ongoing_projects') : project.state === 0 ? t('projects_page.inactive') : t('projects_page.deleted'),
      startDate: new Date(project.start_date).toLocaleDateString(),
      endDate: new Date(project.end_date).toLocaleDateString(),
      postCount: mockPosts.data.filter(p => p.project_id === project.id).length,
      rawStartDate: project.start_date,
      rawState: project.state,
      sectorId: project.sector_id
    }))
    .filter(project =>
      project.projectName.toLowerCase().includes(searchText.toLowerCase()) &&
      (selectedStates.length === 0 || selectedStates.includes(project.rawState)) &&
      (selectedSectors.length === 0 || selectedSectors.includes(project.sectorId)) &&
      (!dateRange || (
        (!dateRange[0] || new Date(project.rawStartDate) >= dateRange[0]) &&
        (!dateRange[1] || new Date(project.rawStartDate) <= dateRange[1])
      ))
    )

  // Cột cho bảng dự án
  const columns = [
    {
      title: t('dashboard_page.project_name'),
      dataIndex: 'projectName',
      key: 'projectName',
    },
    {
      title: t('projects_page.sector_name'),
      dataIndex: 'sectorName',
      key: 'sectorName',
    },
    {
      title: t('projects_page.state'),
      dataIndex: 'state',
      key: 'state',
    },
    {
      title: t('projects_page.start_date'),
      dataIndex: 'startDate',
      key: 'startDate',
    },
    {
      title: t('projects_page.end_date'),
      dataIndex: 'endDate',
      key: 'endDate',
    },
    {
      title: t('dashboard_page.post_count'),
      dataIndex: 'postCount',
      key: 'postCount',
    },
    {
      title: t('actions.view'),
      key: 'action',
      render: (_, record) => (
        <Link to={`/projects/${record.projectId}`}>
          <Button className="btn" type="primary">{t('actions.view')}</Button>
        </Link>
      ),
    },
  ]

  return (
    <div>
      <Breadcrumb
        items={[
          {
            href: null,
            title: (
              <>
                <HomeOutlined/>
                <span>{t('menu.dashboard')}</span>
              </>
            ),
            onClick: () => navigate('/'),
          },
          {
            title: <span>{t('menu.projects')}</span>,
          },
        ]}
      />
      <Card className="mt-4">
        <Title level={2} className="mb-4">{t('projects_page.project_list')}</Title>
        <Row gutter={[16, 16]} className="mb-4">
          <Col span={6}>
            <Input
              placeholder={t('projects_page.search_project')}
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              className="w-full"
            />
          </Col>
          <Col span={6}>
            <Select
              mode="multiple"
              placeholder={t('projects_page.filter_by_state')}
              value={selectedStates}
              onChange={setSelectedStates}
              className="w-full"
              allowClear
              suffixIcon={null}
            >
              <Option value={-1}>{t('projects_page.deleted')}</Option>
              <Option value={0}>{t('projects_page.inactive')}</Option>
              <Option value={1}>{t('dashboard_page.ongoing_projects')}</Option>
            </Select>
          </Col>
          <Col span={6}>
            <Select
              mode="multiple"
              placeholder={t('projects_page.filter_by_sector')}
              value={selectedSectors}
              onChange={setSelectedSectors}
              className="w-full"
              allowClear
              suffixIcon={null}
            >
              {mockSectors.data.map(sector => (
                <Option key={sector.id} value={sector.id}>{sector.name}</Option>
              ))}
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
        {projectData.length === 0 ? (
          <Empty description={t('projects_page.no_projects_found')} className="my-8"/>
        ) : (
          <Table
            dataSource={projectData}
            columns={columns}
            pagination={false}
            rowKey="projectId"
          />
        )}
      </Card>
    </div>
  )
}
