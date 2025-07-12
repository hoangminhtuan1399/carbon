import { Breadcrumb, Card, Typography, Space, Empty, Row, Col } from "antd"
import { HomeOutlined } from "@ant-design/icons"
import { useTranslation } from "react-i18next"
import { useNavigate, useParams } from "react-router"
import { mockProjects } from "/mock-data/mock-projects.js"
import { mockFacilities } from "/mock-data/mock-facilities.js"
import { mockPosts } from "/mock-data/mock-posts.js"
import { mockEmissionCategories } from "/mock-data/mock-emission-categories.js"
import PostList from "../../components/PostList/PostList.jsx"
import EmissionCategoryList from "../../components/EmissionCategoryList/EmissionCategoryList.jsx"

const { Title, Text } = Typography

export const FacilityDetailPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { projectId, facilityId } = useParams()

  // Lấy thông tin cơ sở và dự án
  const facility = mockFacilities.data.find(f => f.id === parseInt(facilityId) && f.project_id === parseInt(projectId))
  const project = mockProjects.data.find(p => p.id === parseInt(projectId))

  // Lấy danh sách bài đăng liên quan
  const postData = mockPosts.data.filter(p => p.facility_id === parseInt(facilityId))

  // Lấy danh sách emission-categories liên quan
  const emissionCategoryData = mockEmissionCategories.data.filter(ec => ec.facility_id === parseInt(facilityId))

  if (!facility || !project) {
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
              title: <span>{project?.name || t('projects_page.project_detail')}</span>,
              onClick: () => navigate(`/projects/${projectId}`),
            },
            {
              title: t('projects_page.facility_detail'),
            },
          ]}
        />
        <Card className="mt-4">
          <Empty description={t('projects_page.no_facility_found')} className="my-8" />
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
            title: <span>{project.name}</span>,
            onClick: () => navigate(`/projects/${projectId}`),
          },
          {
            title: facility.name,
          },
        ]}
      />
      <Card className="mt-4">
        <Title level={2} className="mb-4">{t('projects_page.facility_detail')}</Title>
        <Space direction="vertical" size="middle" className="w-full">
          <Row>
            <Col span={12}>
              <Text strong>{t('dashboard_page.facility_name')}:</Text> {facility.name}
            </Col>
            <Col span={12}>
              <Text strong>{t('dashboard_page.project_name')}:</Text> {project.name}
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Text strong>{t('projects_page.address')}:</Text> {facility.address}
            </Col>
            <Col span={12}>
              <Text strong>{t('projects_page.staff_size')}:</Text> {facility.staff_size}
            </Col>
          </Row>
        </Space>
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
