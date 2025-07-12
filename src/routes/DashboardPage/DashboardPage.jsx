import { Breadcrumb, Row, Col } from "antd"
import { HomeOutlined } from "@ant-design/icons"
import { useTranslation } from "react-i18next"
import { mockProjects } from "/mock-data/mock-projects.js"
import { mockPosts } from "/mock-data/mock-posts.js"
import { mockFacilities } from "/mock-data/mock-facilities.js"
import ProjectOverview from "../../components/ProjectOverview/ProjectOverview.jsx"
import EvaluationProgress from "../../components/EvaluationProgress/EvaluationProgress.jsx"
import PostStatistics from "../../components/PostStatistics/PostStatistics.jsx"

export const DashboardPage = () => {
  const { t } = useTranslation()

  // Tính toán tổng quan dự án
  const totalProjects = mockProjects.data.length
  const ongoingProjects = mockProjects.data.filter(p => p.state === 1).length
  const completedProjects = mockProjects.data.filter(p => p.state === 2).length

  // Tính toán tiến độ đánh giá
  const totalPosts = mockPosts.data.length
  const verifiedPosts = mockPosts.data.filter(p => p.status === 3 && p.verified_at !== "").length
  const unverifiedPosts = mockPosts.data.filter(p => p.status !== 3 || p.verified_at === "")
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

  return (
    <div>
      <Breadcrumb
        items={[
          {
            title: (
              <>
                <HomeOutlined />
                <span>{t('menu.dashboard')}</span>
              </>
            ),
          },
        ]}
      />
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <PostStatistics
            posts={mockPosts.data}
            projects={mockProjects.data}
          />
        </Col>
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
          <ProjectOverview
            totalProjects={totalProjects}
            ongoingProjects={ongoingProjects}
            completedProjects={completedProjects}
          />
        </Col>
      </Row>
    </div>
  )
}
