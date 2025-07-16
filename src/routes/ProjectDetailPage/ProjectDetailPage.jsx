import { Breadcrumb, Card, Empty, Typography, Tabs } from "antd"
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
            <ProjectInfo project={project} sector={sector} />
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
