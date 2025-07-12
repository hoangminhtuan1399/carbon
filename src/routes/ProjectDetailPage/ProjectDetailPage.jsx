import { Breadcrumb, Card, Empty, Typography } from "antd"
import { useTranslation } from "react-i18next"
import { useNavigate, useParams } from "react-router"
import { mockProjects } from "/mock-data/mock-projects.js"
import { mockFacilities } from "/mock-data/mock-facilities.js"
import { mockPosts } from "/mock-data/mock-posts.js"
import { mockSectors } from "/mock-data/mock-sectors.js"
import { mockEmissionCategories } from "/mock-data/mock-emission-categories.js"
import PostList from "../../components/PostList/PostList.jsx"
import EmissionCategoryList from "../../components/EmissionCategoryList/EmissionCategoryList.jsx"
import ProjectInfo from "../../components/ProjectInfo/ProjectInfo.jsx"
import FacilityList from "../../components/FacilityList/FacilityList.jsx"
import { HomeOutlined } from "@ant-design/icons"

const { Title } = Typography

export const ProjectDetailPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { projectId } = useParams()

  // Lấy thông tin dự án
  const project = mockProjects.data.find(p => p.id === parseInt(projectId))
  const sector = mockSectors.data.find(s => s.id === project?.sector_id)

  // Lấy danh sách cơ sở, bài đăng, và emission-categories liên quan
  const facilityData = mockFacilities.data.filter(f => f.project_id === parseInt(projectId))
  const postData = mockPosts.data.filter(p => p.project_id === parseInt(projectId))
  const emissionCategoryData = mockEmissionCategories.data.filter(ec => ec.project_id === parseInt(projectId))

  const pageContent = project ? (
    <>
      <ProjectInfo project={project} sector={sector}/>
      <Card className="mt-4">
        <Title level={2} className="mb-4">{t('projects_page.facility_list')}</Title>
        <FacilityList
          facilities={facilityData}
          emissionCategories={emissionCategoryData}
          posts={postData}
          projectId={projectId}
        />
      </Card>
      <Card className="mt-4">
        <Title level={2} className="mb-4">{t('projects_page.post_list')}</Title>
        <PostList posts={postData}/>
      </Card>
      <Card className="mt-4">
        <Title level={2} className="mb-4">{t('projects_page.emission_category_list')}</Title>
        <EmissionCategoryList emissionCategories={emissionCategoryData}/>
      </Card>
    </>
  ) : (
    <Card className="mt-4">
      <Empty description={t('projects_page.no_project_found')} className="my-8"/>
    </Card>
  )

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
            onClick: () => navigate('/projects'),
          },
          {
            title: t('projects_page.project_detail'),
          },
        ]}
      />
      {pageContent}
    </div>
  )
}
