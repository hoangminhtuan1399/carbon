import { Breadcrumb, Button, Card, Col, Empty, Row, Tabs, Tooltip, Typography } from "antd"
import { HomeOutlined, PlusOutlined } from "@ant-design/icons"
import { useTranslation } from "react-i18next"
import { useNavigate, useParams } from "react-router"
import { mockProjects } from "/mock-data/mock-projects.js"
import { mockFacilities } from "/mock-data/mock-facilities.js"
import { mockPosts } from "/mock-data/mock-posts.js"
import { mockEmissionFactors } from "/mock-data/mock-emission-factors.js"
import PostList from "../../components/PostList/PostList.jsx"
import EmissionCategoryList from "../../components/EmissionCategoryList/EmissionCategoryList.jsx"
import FactorAssignmentModal from "../../components/FactorAssignmentModal/FactorAssignmentModal.jsx"
import PostStatistics from "../../components/PostStatistics/PostStatistics.jsx"
import EvaluationProgress from "../../components/EvaluationProgress/EvaluationProgress.jsx"
import RecentPosts from "../../components/RecentPosts/RecentPosts.jsx"
import { useState } from "react"
import FacilityInfo from "../../components/FacilityInfo/FacilityInfo.jsx"

const { Title, Text } = Typography
const { TabPane } = Tabs

export const FacilityDetailPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { projectId, facilityId } = useParams()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedFactors, setSelectedFactors] = useState(mockEmissionFactors.data.filter(ec => ec.facility_id === parseInt(facilityId)))

  // Lấy thông tin cơ sở và dự án
  const facility = mockFacilities.data.find(f => f.id === parseInt(facilityId))
  const project = mockProjects.data.find(p => p.id === parseInt(projectId))

  // Lấy danh sách bài đăng và emission factors liên quan
  const postData = mockPosts.data.filter(p => p.facility_id === parseInt(facilityId))
  const emissionFactorData = selectedFactors

  // Dữ liệu cho EvaluationProgress
  const totalPosts = postData.length
  const verifiedPosts = postData.filter(p => p.status === 3 && p.verified_at !== "").length
  const unverifiedPosts = postData.filter(p => p.status !== 3 || p.verified_at === "")
  const unverifiedPostsByProject = [{
    projectId: project?.id,
    projectName: project?.name,
    unverifiedCount: unverifiedPosts.length
  }].filter(p => p.unverifiedCount > 0)
  const unverifiedPostsByFacility = [{
    facilityId: facility?.id,
    facilityName: facility?.name,
    unverifiedCount: unverifiedPosts.length
  }].filter(f => f.unverifiedCount > 0)

  if (!facility || !project) {
    return (
      <div>
        <Breadcrumb
          items={[
            {
              href: null,
              title: <HomeOutlined/>,
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
          <Empty description={t('projects_page.no_facility_found')} className="my-8"/>
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
            title: <HomeOutlined/>,
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
      <Tabs defaultActiveKey="info" className="mt-4">
        <TabPane tab={t('projects_page.facility_detail')} key="info">
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Card>
                <FacilityInfo facility={facility}/>
              </Card>
            </Col>
            <Col span={16}>
              <PostStatistics posts={postData} projects={[project]}/>
            </Col>
            <Col span={8}>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <EvaluationProgress
                    totalPosts={totalPosts}
                    verifiedPosts={verifiedPosts}
                    unverifiedPosts={unverifiedPosts}
                    unverifiedPostsByProject={unverifiedPostsByProject}
                    unverifiedPostsByFacility={unverifiedPostsByFacility}
                  />
                </Col>
                <Col span={24}>
                  <RecentPosts posts={postData}/>
                </Col>
              </Row>
            </Col>
          </Row>
        </TabPane>
        <TabPane tab={t('projects_page.post_list')} key="posts">
          <Card>
            <PostList posts={postData}/>
          </Card>
        </TabPane>
        <TabPane tab={t('projects_page.emission_category_list')} key="emissionFactors">
          <Card>
            <Row justify="space-between" align="middle" className="mb-4">
              <Col>
                <Title level={2} className="mb-0">{t('projects_page.emission_category_list')}</Title>
              </Col>
              <Col>
                <Tooltip title={t('projects_page.assign_factors')}>
                  <Button icon={<PlusOutlined />} className="btn" type="primary" onClick={() => setIsModalVisible(true)}>
                  </Button>
                </Tooltip>
              </Col>
            </Row>
            <EmissionCategoryList emissionCategories={emissionFactorData}/>
          </Card>
        </TabPane>
      </Tabs>
      <FactorAssignmentModal
        visible={isModalVisible}
        onOk={() => setIsModalVisible(false)}
        onCancel={() => setIsModalVisible(false)}
        selectedFactors={selectedFactors}
        setSelectedFactors={setSelectedFactors}
        facilityId={parseInt(facilityId)}
        projectId={parseInt(projectId)}
      />
    </div>
  )
}
