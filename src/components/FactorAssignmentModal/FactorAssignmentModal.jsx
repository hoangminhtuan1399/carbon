import { Button, Cascader, Col, Empty, Input, Modal, Row, Table, Typography } from "antd"
import { DeleteOutlined } from "@ant-design/icons"
import { useTranslation } from "react-i18next"
import { useRef, useState } from "react"
import { mockStandardFactors } from "/mock-data/mock-standard-factors.js"
import { EMISSION_FACTORS } from "../../constants/libraries.js"

const { Title } = Typography
const { TextArea } = Input

const FactorAssignmentModal = ({ visible, onOk, onCancel, facilityId, projectId }) => {
  const { t } = useTranslation()
  const [confirmReason, setConfirmReason] = useState('')
  const [selectedFactors, setSelectedFactors] = useState([])
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false)
  const [isCancelModalVisible, setIsCancelModalVisible] = useState(false)
  const standardFactors = mockStandardFactors.data
  const cascaderScrollRef = useRef(null)

  // Xử lý chọn yếu tố từ Cascader
  const handleCascaderChange = (value) => {
    if (cascaderScrollRef.current) {
      setTimeout(() => {
        cascaderScrollRef.current.scrollTo({
          left: cascaderScrollRef.current.scrollWidth,
          behavior: 'smooth'
        })
      }, 0)
    }
    if (!value) return
    const code = value[value.length - 1]
    const factor = standardFactors.find(f => f.code === code)
    if (!factor) return
    if (selectedFactors.some(f => f.code === code)) return
    setSelectedFactors([...selectedFactors, { ...factor, facility_id: facilityId, project_id: projectId }])
  }

  const popupRender = menus => {
    return (
      <div className={'overflow-x-auto'} ref={cascaderScrollRef}>
        {menus}
      </div>
    )
  }

  // Cột cho bảng yếu tố đã chọn
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
      title: '',
      key: 'action',
      render: (_, record) => (
        <Button
          type="primary"
          danger
          icon={<DeleteOutlined/>}
          onClick={() => setSelectedFactors(selectedFactors.filter(f => f.code !== record.code))}
        />
      ),
    },
  ]

  // Xử lý confirm
  const handleConfirmOk = () => {
    if (confirmReason.trim()) {
      onOk(selectedFactors)
      setIsConfirmModalVisible(false)
      setConfirmReason('')
    }
  }

  // Xử lý cancel
  const handleCancel = () => {
    setIsCancelModalVisible(true)
  }

  return (
    <>
      <Modal
        title={<Title level={3}>{t('projects_page.assign_factors')}</Title>}
        open={visible}
        onOk={() => setIsConfirmModalVisible(true)}
        onCancel={handleCancel}
        width={800}
      >
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <div className={'js-factor-picker relative'}>
              <Cascader
                options={EMISSION_FACTORS}
                onChange={handleCascaderChange}
                placeholder={t('projects_page.search_factors')}
                changeOnSelect={true}
                popupRender={popupRender}
                showSearch={{
                  filter: (inputValue, path) => {
                    return path.some(option => option.label.toLowerCase().includes(inputValue.toLowerCase()) || option.value.toLowerCase().startsWith(inputValue.toLowerCase()))
                  }
                }}
                className="w-full mb-4"
                getPopupContainer={() => {
                  return document.querySelector('.js-factor-picker')
                }}
              />
            </div>
          </Col>
          <Col span={24}>
            <Title level={4} className="mb-4">{t('projects_page.selected_factors')}</Title>
            {selectedFactors.length === 0 ? (
              <Empty description={t('projects_page.no_selected_factors')} className="my-8"/>
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
      <Modal
        title={t('projects_page.confirm_assign_factors')}
        open={isConfirmModalVisible}
        onOk={handleConfirmOk}
        onCancel={() => setIsConfirmModalVisible(false)}
        okButtonProps={{ disabled: !confirmReason.trim() }}
      >
        <TextArea
          placeholder={t('projects_page.enter_reason')}
          value={confirmReason}
          onChange={e => setConfirmReason(e.target.value)}
          rows={4}
        />
      </Modal>
      <Modal
        title={t('projects_page.confirm_cancel')}
        open={isCancelModalVisible}
        onOk={() => {
          setIsCancelModalVisible(false)
          onCancel()
        }}
        onCancel={() => setIsCancelModalVisible(false)}
      >
        <p>{t('projects_page.confirm_cancel_message')}</p>
      </Modal>
    </>
  )
}

export default FactorAssignmentModal
