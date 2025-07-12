import { Table, Empty } from "antd"
import { useTranslation } from "react-i18next"

const EmissionCategoryList = ({ emissionCategories }) => {
  const { t, i18n } = useTranslation()

  // Dữ liệu danh mục phát thải
  const emissionCategoryData = emissionCategories.map(ec => ({
    key: ec.id,
    name: ec.name,
    viName: ec.vi_name,
    scope: ec.scope,
    co2: ec.co2,
    ch4: ec.ch4,
    n2o: ec.n2o,
  }))

  // Cột cho bảng danh mục phát thải
  const columns = [
    {
      title: t('projects_page.emission_category_name'),
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => i18n.language === 'en' ? record.name : record.viName,
    },
    {
      title: t('projects_page.scope'),
      dataIndex: 'scope',
      key: 'scope',
    },
    {
      title: 'CO2 (kg CO2e/unit)',
      dataIndex: 'co2',
      key: 'co2',
    },
    {
      title: 'CH4 (kg CO2e/unit)',
      dataIndex: 'ch4',
      key: 'ch4',
    },
    {
      title: 'N2O (kg CO2e/unit)',
      dataIndex: 'n2o',
      key: 'n2o',
    },
  ]

  return emissionCategoryData.length === 0 ? (
    <Empty description={t('projects_page.no_emission_categories_found')} className="my-8" />
  ) : (
    <Table
      dataSource={emissionCategoryData}
      columns={columns}
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '50'],
      }}
      rowKey="key"
    />
  )
}

export default EmissionCategoryList
