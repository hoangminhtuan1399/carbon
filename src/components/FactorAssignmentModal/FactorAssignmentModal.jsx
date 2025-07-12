import { Modal, Select, Input, Button, Table, Row, Col, Typography, Tabs, Empty } from "antd"
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons"
import { useTranslation } from "react-i18next"
import { useState, useEffect } from "react"
import { mockStandardFactors } from "/mock-data/mock-standard-factors.js"

const { Option } = Select
const { Title } = Typography
const { TabPane } = Tabs

const FactorAssignmentModal = ({ visible, onOk, onCancel, selectedFactors, setSelectedFactors, facilityId, projectId }) => {
  const { t } = useTranslation()
  const [levelSelections, setLevelSelections] = useState([null, null, null, null, null, null])
  const [searchText, setSearchText] = useState('')
  const standardFactors = mockStandardFactors.data

  // Tạo levelStructure động từ mockStandardFactors
  const generateLevelStructure = () => {
    const structure = { '1': [] }
    standardFactors.forEach(factor => {
      const levels = factor.code.split('.')
      for (let i = 0; i < levels.length - 1; i++) {
        const parent = i === 0 ? '1' : levels.slice(0, i).join('.')
        const child = levels[i]
        if (!structure[parent]) structure[parent] = []
        if (!structure[parent].includes(child)) structure[parent].push(child)
      }
    })
    return structure
  }

  const levelStructure = generateLevelStructure()

  // Lọc factors theo level đã chọn
  const getFilteredFactorsByLevel = () => {
    const selectedLevel = levelSelections.findIndex(val => val === null)
    const currentLevel = selectedLevel === -1 ? 6 : selectedLevel
    if (currentLevel === 0) return standardFactors

    const prefixParts = levelSelections.slice(0, currentLevel).filter(Boolean)
    let prefix = ''
    if (prefixParts.length > 0) {
      const levelPrefixes = ['1']
      for (let i = 1; i < prefixParts.length; i++) {
        levelPrefixes.push(`${levelPrefixes[i - 1]}.${prefixParts[i - 1]}`)
      }
      prefix = `${levelPrefixes[prefixParts.length - 1]}.${prefixParts[prefixParts.length - 1]}`
    }
    return standardFactors.filter(factor => factor.code.startsWith(prefix))
  }

  // Xử lý chọn level
  const handleLevelChange = (value, levelIndex) => {
    const newSelections = [...levelSelections]
    newSelections[levelIndex] = value
    for (let i = levelIndex + 1; i < 6; i++) {
      newSelections[i] = null
    }
    setLevelSelections(newSelections)
  }

  // Lọc factors theo tìm kiếm
  const filteredFactors = searchText.length >= 2
    ? standardFactors.filter(f =>
      f.code.toLowerCase().includes(searchText.toLowerCase()) ||
      f.name.toLowerCase().includes(searchText.toLowerCase())
    )
    : getFilteredFactorsByLevel()

  // Cột cho bảng factor
  const factorColumns = [
    {
      title: t('projects_page.emission_category_name'),
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => t('general.language') === 'en' ? record.name : record.vi_name,
    },
    {
      title: t('projects_page.emission_factor_code'),
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: '',
      key: 'action',
      render: (_, record) => (
        <Button
          className={'btn'}
          type="primary"
          onClick={() => {
            if (!selectedFactors.some(f => f.code === record.code)) {
              setSelectedFactors([...selectedFactors, { ...record, facility_id: facilityId, project_id: projectId }])
            }
          }}
          disabled={selectedFactors.some(f => f.code === record.code)}
          icon={<PlusOutlined />}
        />
      ),
    },
  ]

  // Cột cho bảng factor đã chọn
  const selectedColumns = [
    {
      title: t('projects_page.emission_category_name'),
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => t('general.language') === 'en' ? record.name : record.vi_name,
    },
    {
      title: t('projects_page.emission_factor_code'),
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: t('actions.remove'),
      key: 'action',
      render: (_, record) => (
        <Button
          color={'danger'}
          variant={'solid'}
          type="primary"
          icon={<DeleteOutlined />}
          onClick={() => setSelectedFactors(selectedFactors.filter(f => f.code !== record.code))}
        />
      ),
    },
  ]

  return (
    <Modal
      title={<Title level={3}>{t('projects_page.assign_factors')}</Title>}
      open={visible}
      onOk={onOk}
      onCancel={onCancel}
      width={800}
    >
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Tabs defaultActiveKey="level">
            <TabPane tab={t('projects_page.select_by_level')} key="level">
              <Row gutter={[8, 8]} className="mb-4">
                {Array.from({ length: 6 }).map((_, index) => {
                  const prevLevel = index === 0 ? '1' : levelSelections.slice(0, index).join('.')
                  const options = prevLevel ? levelStructure[prevLevel] || [] : []
                  return (
                    <Col span={4} key={index}>
                      <Select
                        value={levelSelections[index]}
                        onChange={value => handleLevelChange(value, index)}
                        className="w-full"
                        placeholder={t('projects_page.level', { level: index + 1 })}
                        disabled={!prevLevel || !options.length}
                        allowClear
                      >
                        {options.map(option => (
                          <Option key={option} value={option}>{option}</Option>
                        ))}
                      </Select>
                    </Col>
                  )
                })}
              </Row>
            </TabPane>
            <TabPane tab={t('projects_page.search_factors')} key="search">
              <Input
                placeholder={t('projects_page.search_by_code_or_name')}
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                className="w-full mb-4"
              />
            </TabPane>
          </Tabs>
        </Col>
        <Col span={24}>
          {filteredFactors.length === 0 && (searchText.length >= 2 || levelSelections[0] !== null) ? (
            <Empty description={t('projects_page.no_factors_found')} className="my-8" />
          ) : (
            <Table
              dataSource={filteredFactors}
              columns={factorColumns}
              pagination={{ pageSize: 5 }}
              rowKey="code"
            />
          )}
        </Col>
        <Col span={24}>
          <Title level={4} className="mb-4">{t('projects_page.selected_factors')}</Title>
          {selectedFactors.length === 0 ? (
            <Empty description={t('projects_page.no_selected_factors')} className="my-8" />
          ) : (
            <Table
              dataSource={selectedFactors}
              columns={selectedColumns}
              pagination={{ pageSize: 5 }}
              rowKey="code"
            />
          )}
        </Col>
      </Row>
    </Modal>
  )
}

export default FactorAssignmentModal
