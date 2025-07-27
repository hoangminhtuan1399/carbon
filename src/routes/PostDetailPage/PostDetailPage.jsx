import { Breadcrumb, Empty } from "antd"
import { HomeOutlined } from "@ant-design/icons"
import { useTranslation } from "react-i18next"
import { useNavigate, useParams } from "react-router"
import { mockPosts } from "/mock-data/mock-posts.js"
import { mockProjects } from "/mock-data/mock-projects.js"
import { mockFacilities } from "/mock-data/mock-facilities.js"
import PostDetail from "../../components/PostDetail/PostDetail.jsx"

const PostDetailPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { postId } = useParams()

  const post = mockPosts.data.find(p => p.id === parseInt(postId))
  const project = mockProjects.data.find(p => p.id === post?.project_id)
  const facility = mockFacilities.data.find(f => f.id === post?.facility_id)

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
            onClick: () => navigate('/'),
          },
          {
            title: t('menu.posts'),
            onClick: () => navigate('/posts'),
          },
          {
            title: post?.title || t('posts_page.post_detail'),
          },
        ]}
      />
      {post ? (
        <div className="mt-4">
          <PostDetail
            post={post}
            projectName={project?.name || 'Unknown'}
            facilityName={facility?.name || 'Unknown'}
            showViewButton={false}
          />
        </div>
      ) : (
        <Empty description={t('posts_page.no_post_found')} className="mt-4 my-8" />
      )}
    </div>
  )
}

export default PostDetailPage
