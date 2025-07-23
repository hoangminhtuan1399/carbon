import { Breadcrumb, Card, Empty, Typography, Tabs, Row, Col } from "antd"
import { HomeOutlined } from "@ant-design/icons"
import { useTranslation } from "react-i18next"
import { useNavigate, useParams } from "react-router"
import { mockProjects } from "/mock-data/mock-projects.js"
import { mockFacilities } from "/mock-data/mock-facilities.js"
import { mockPosts } from "/mock-data/mock-posts.js"
import { mockSectors } from "/mock-data/mock-sectors.js"
import { mockEmissionFactors } from "/mock-data/mock-emission-factors.js"
import ProjectInfo from "../../components/ProjectInfo/ProjectInfo.jsx"
import FacilityList from "../../components/FacilityList/FacilityList.jsx"
import PostList from "../../components/PostList/PostList.jsx"
import EmissionCategoryList from "../../components/EmissionCategoryList/EmissionCategoryList.jsx"
import PostStatistics from "../../components/PostStatistics/PostStatistics.jsx"
import EvaluationProgress from "../../components/EvaluationProgress/EvaluationProgress.jsx"
import RecentPosts from "../../components/RecentPosts/RecentPosts.jsx"

const { Title } = Typography
const { TabPane } = Tabs

export const ProjectDetailPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { projectId } = useParams()

  // Lấy thông tin dự án
  const project = mockProjects.data.find(p => p.id === parseInt(projectId))
  const sector = mockSectors.data.find(s => s.id === project?.sector_id)

  // Lấy danh sách cơ sở, bài đăng, và emission factors liên quan
  const facilityData = mockFacilities.data.filter(f => f.project_id === parseInt(projectId))
  const postData = mockPosts.data.filter(p => p.project_id === parseInt(projectId))
  const emissionFactorData = mockEmissionFactors.data.filter(ec => ec.project_id === parseInt(projectId))

  // Dữ liệu cho EvaluationProgress
  const totalPosts = postData.length
  const verifiedPosts = postData.filter(p => p.status === 3 && p.verified_at !== "").length
  const unverifiedPosts = postData.filter(p => p.status !== 3 || p.verified_at === "")
  const unverifiedPostsByProject = [{
    projectId: project?.id,
    projectName: project?.name,
    unverifiedCount: unverifiedPosts.length
  }].filter(p => p.unverifiedCount > 0)
  const unverifiedPostsByFacility = facilityData
    .map(facility => ({
      facilityId: facility.id,
      facilityName: facility.name,
      unverifiedCount: postData.filter(p => p.facility_id === facility.id && (p.status !== 3 || p.verified_at === "")).length
    }))
    .filter(facility => facility.unverifiedCount > 0)

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
            title: project?.name || t('projects_page.project_detail'),
          },
        ]}
      />
      {project ? (
        <Tabs defaultActiveKey="info" className="mt-4">
          <TabPane tab={t('projects_page.project_detail')} key="info">
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <ProjectInfo project={project} sector={sector} />
              </Col>
              <Col span={16}>
                <PostStatistics posts={postData} projects={[project]} />
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
                    <RecentPosts posts={postData} />
                  </Col>
                </Row>
              </Col>
            </Row>
          </TabPane>
          <TabPane tab={t('projects_page.facility_list')} key="facilities">
            <Card>
              <FacilityList
                facilities={facilityData}
                emissionCategories={emissionFactorData}
                posts={postData}
                projectId={projectId}
              />
            </Card>
          </TabPane>
          <TabPane tab={t('projects_page.post_list')} key="posts">
            <Card>
              <PostList posts={postData} />
            </Card>
          </TabPane>
          <TabPane tab={t('projects_page.emission_category_list')} key="emissionFactors">
            <Card>
              <EmissionCategoryList emissionCategories={emissionFactorData} />
            </Card>
          </TabPane>
        </Tabs>
      ) : (
        <Card className="mt-4">
          <Empty description={t('projects_page.no_project_found')} className="my-8" />
        </Card>
      )}
    </div>
  )
}
