import { Breadcrumb, Card, Table, Button, Typography, Row, Col, Space, Empty, Input } from "antd"
import { HomeOutlined } from "@ant-design/icons"
import { useTranslation } from "react-i18next"
import { useNavigate, Link, useParams } from "react-router"
import { mockProjects } from "/mock-data/mock-projects.js"
import { mockFacilities } from "/mock-data/mock-facilities.js"
import { mockPosts } from "/mock-data/mock-posts.js"
import { mockSectors } from "/mock-data/mock-sectors.js"
import { mockEmissionCategories } from "/mock-data/mock-emission-categories.js"
import { useState } from "react"
import PostList from "../../components/PostList/PostList.jsx"
import EmissionCategoryList from "../../components/EmissionCategoryList/EmissionCategoryList.jsx"

const { Title, Text } = Typography

export const ProjectDetailPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { projectId } = useParams()

  // Trạng thái cho tìm kiếm cơ sở
  const [facilitySearchText, setFacilitySearchText] = useState('')

  // Lấy thông tin dự án
  const project = mockProjects.data.find(p => p.id === parseInt(projectId))
  const sector = mockSectors.data.find(s => s.id === project?.sector_id)

  // Lấy danh sách cơ sở liên quan
  const facilityData = mockFacilities.data
    .filter(f => f.project_id === parseInt(projectId))
    .map(facility => ({
      key: facility.id,
      facilityId: facility.id,
      name: facility.name,
      address: facility.address,
      staffSize: facility.staff_size,
    }))
    .filter(facility => facility.name.toLowerCase().includes(facilitySearchText.toLowerCase()))

  // Lấy danh sách bài đăng liên quan
  const postData = mockPosts.data.filter(p => p.project_id === parseInt(projectId))

  // Lấy danh sách emission-categories liên quan
  const emissionCategoryData = mockEmissionCategories.data.filter(ec => ec.project_id === parseInt(projectId))

  // Cột cho bảng cơ sở
  const facilityColumns = [
    {
      title: t('dashboard_page.facility_name'),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: t('projects_page.address'),
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: t('projects_page.staff_size'),
      dataIndex: 'staffSize',
      key: 'staffSize',
    },
    {
      title: t('actions.view'),
      key: 'action',
      render: (_, record) => (
        <Link to={`/projects/${projectId}/facilities/${record.facilityId}`}>
          <Button className="btn" type="primary">{t('actions.view')}</Button>
        </Link>
      ),
    },
  ]

  if (!project) {
    return (
      <div>
        <Breadcrumb
          items={[
            {
              href: null,
              title: (
                <>
                  <HomeOutlined />
                  <span>{t('menu.dashboard')}</span>
                </>
              ),
              onClick: () => navigate('/'),
            },
            {
              title: <span>{t('menu.projects')}</span>,
              onClick: () => navigate('/projects'),
            },
            {
              title: t('projects_page.project_detail'),
            },
          ]}
        />
        <Card className="mt-4">
          <Empty description={t('projects_page.no_project_found')} className="my-8" />
        </Card>
      </div>
    )
  }

  return (
    <div>
      <Breadcrumb
        items={[
          {
            href: null,
            title: <HomeOutlined />,
            onClick: () => navigate('/'),
          },
          {
            title: <span>{t('menu.projects')}</span>,
            onClick: () => navigate('/projects'),
          },
          {
            title: project.name,
          },
        ]}
      />
      <Card className="mt-4">
        <Title level={2} className="mb-4">{t('projects_page.project_detail')}</Title>
        <Space direction="vertical" size="middle" className="w-full">
          <Row>
            <Col span={12}>
              <Text strong>{t('projects_page.sector_name')}:</Text> {sector?.name || 'Unknown'}
            </Col>
            <Col span={12}>
              <Text strong>{t('projects_page.state')}:</Text>
              {project.state === 1 ? t('dashboard_page.ongoing_projects') : project.state === 0 ? t('projects_page.inactive') : t('projects_page.deleted')}
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Text strong>{t('projects_page.start_date')}:</Text> {new Date(project.start_date).toLocaleDateString()}
            </Col>
            <Col span={12}>
              <Text strong>{t('projects_page.end_date')}:</Text> {new Date(project.end_date).toLocaleDateString()}
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Text strong>{t('projects_page.description')}:</Text> {project.description}
            </Col>
          </Row>
        </Space>
      </Card>
      <Card className="mt-4">
        <Title level={2} className="mb-4">{t('projects_page.facility_list')}</Title>
        <Row gutter={[16, 16]} className="mb-4">
          <Col span={6}>
            <Input
              placeholder={t('projects_page.search_facility')}
              value={facilitySearchText}
              onChange={e => setFacilitySearchText(e.target.value)}
              className="w-full"
            />
          </Col>
        </Row>
        {facilityData.length === 0 ? (
          <Empty description={t('projects_page.no_facilities_found')} className="my-8" />
        ) : (
          <Table
            dataSource={facilityData}
            columns={facilityColumns}
            pagination={false}
            rowKey="facilityId"
          />
        )}
      </Card>
      <Card className="mt-4">
        <Title level={2} className="mb-4">{t('projects_page.post_list')}</Title>
        <PostList posts={postData} />
      </Card>
      <Card className="mt-4">
        <Title level={2} className="mb-4">{t('projects_page.emission_category_list')}</Title>
        <EmissionCategoryList emissionCategories={emissionCategoryData} />
      </Card>
    </div>
  )
}
