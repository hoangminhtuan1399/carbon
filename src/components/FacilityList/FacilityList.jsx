import { Table, Button, Row, Col, Input, Empty } from "antd"
import { useTranslation } from "react-i18next"
import { Link } from "react-router"
import { useState } from "react"

const FacilityList = ({ facilities, emissionCategories, posts, projectId }) => {
  const { t } = useTranslation()
  const [facilitySearchText, setFacilitySearchText] = useState('')

  // Lấy danh sách cơ sở
  const facilityData = facilities
    .map(facility => ({
      key: facility.id,
      facilityId: facility.id,
      name: facility.name,
      address: facility.address,
      emissionFactorCount: emissionCategories.filter(ec => ec.facility_id === facility.id).length,
      postCount: posts.filter(p => p.facility_id === facility.id).length,
    }))
    .filter(facility => facility.name.toLowerCase().includes(facilitySearchText.toLowerCase()))

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
      title: t('projects_page.emission_factor_count'),
      dataIndex: 'emissionFactorCount',
      key: 'emissionFactorCount',
    },
    {
      title: t('projects_page.post_count'),
      dataIndex: 'postCount',
      key: 'postCount',
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

  return (
    <>
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
    </>
  )
}

export default FacilityList
