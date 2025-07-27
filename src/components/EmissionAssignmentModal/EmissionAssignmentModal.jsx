import { Modal, Table, Transfer } from "antd"
import { useTranslation } from "react-i18next"
import { useEffect, useState } from "react"
import { mockEmissionFactors } from "/mock-data/mock-emission-factors.js"

const TableTransfer = ({ leftColumns, rightColumns, ...restProps }) => (
  <Transfer {...restProps}>
    {({
        direction,
        filteredItems,
        onItemSelectAll,
        onItemSelect,
        selectedKeys: listSelectedKeys,
        disabled: listDisabled,
      }) => {
      const columns = direction === 'left' ? leftColumns : rightColumns
      const rowSelection = {
        getCheckboxProps: () => ({ disabled: listDisabled }),
        onSelectAll: (selected, selectedRows) => {
          const keys = selectedRows.map(item => item.key)
          onItemSelectAll(keys, selected)
        },
        onSelect: ({ key }, selected) => onItemSelect(key, selected),
        selectedRowKeys: listSelectedKeys,
      }

      return (
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredItems}
          size="small"
          pagination={{ pageSize: 10 }}
          onRow={({ key, disabled: itemDisabled }) => ({
            onClick: () => {
              if (!itemDisabled) onItemSelect(key, !listSelectedKeys.includes(key))
            },
          })}
        />
      )
    }}
  </Transfer>
)

const EmissionAssignmentModal = ({ visible, onOk, onCancel, user }) => {
  const { t } = useTranslation()
  const [targetKeys, setTargetKeys] = useState([])
  const [selectedKeys, setSelectedKeys] = useState([])

  const projectEmissionFactors = mockEmissionFactors.data
    .filter(ef => ef.project_id === user?.project_id)
    .map(ef => ({
      key: ef.id.toString(),
      code: ef.code,
      name: ef.name,
      vi_name: ef.vi_name
    }))

  const userEmissionFactors = []

  useEffect(() => {
    setTargetKeys(userEmissionFactors.map(ef => ef.key))
  }, [user])

  const leftColumns = [
    { dataIndex: 'code', title: t('projects_page.emission_factor_code') },
    {
      dataIndex:'name',
      title: t('projects_page.emission_category_name'),
    }
  ]

  const rightColumns = [
    { dataIndex: 'code', title: t('projects_page.emission_factor_code') },
    {
      dataIndex: 'name',
      title: t('projects_page.emission_category_name'),
    }
  ]

  const handleChange = (newTargetKeys) => {
    setTargetKeys(newTargetKeys)
  }

  const handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys])
  }

  const handleOk = () => {
    console.log(`Assign emission factors for user ${user?.id}:`, targetKeys)
    onOk()
  }

  return (
    <Modal
      title={t('users_page.editing_emissions_for', { name: user?.full_name })}
      open={visible}
      onOk={handleOk}
      onCancel={onCancel}
      okButtonProps={{ disabled: false }}
      width={1200}
    >
      <TableTransfer
        dataSource={projectEmissionFactors}
        targetKeys={targetKeys}
        selectedKeys={selectedKeys}
        onChange={handleChange}
        onSelectChange={handleSelectChange}
        showSearch
        filterOption={(inputValue, item) =>
          item.code.toLowerCase().includes(inputValue.toLowerCase()) ||
          item.name.toLowerCase().includes(inputValue.toLowerCase()) ||
          item.vi_name.toLowerCase().includes(inputValue.toLowerCase())
        }
        leftColumns={ leftColumns}
        rightColumns={rightColumns}
        titles={[
          t('projects_page.available_factors'),
          t('projects_page.assigned_factors'),
        ]}
      />
    </Modal>
  )
}

export default EmissionAssignmentModal
